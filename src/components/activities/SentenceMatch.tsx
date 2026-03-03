import { useState, useMemo } from 'react'
import { Sentence } from '../../data/sentences/ar'
import { useAudio } from '../../hooks/useAudio'
import './SentenceMatch.css'

interface Props {
  sentences: Sentence[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function buildOptions(sentences: Sentence[], currentIdx: number): { translation: string; isCorrect: boolean }[] {
  const correct = sentences[currentIdx].translation
  const pool = sentences.filter((_, i) => i !== currentIdx).map((s) => s.translation)
  const step = Math.max(1, Math.floor(pool.length / 2))
  const distractors = [
    pool[(currentIdx * 2) % pool.length],
    pool[(currentIdx * 2 + step) % pool.length],
  ]
  const options = [
    { translation: correct, isCorrect: true },
    ...distractors.map((t) => ({ translation: t, isCorrect: false })),
  ]
  return options.sort((a, b) =>
    (a.translation.charCodeAt(0) + currentIdx) % 3 - (b.translation.charCodeAt(0) + currentIdx) % 3
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function SentenceMatch({ sentences, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = sentences[idx]
  const options = useMemo(() => buildOptions(sentences, idx), [sentences, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && options[selectedIdx!]?.isCorrect

  const handleSelect = (optIdx: number) => {
    if (checked) return
    setSelectedIdx(optIdx)
  }

  const handleNext = () => {
    if (idx + 1 >= sentences.length) {
      onComplete()
    } else {
      setIdx(idx + 1)
      setSelectedIdx(null)
    }
  }

  return (
    <div className="sentence-match">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((idx + 1) / sentences.length) * 100}%` }} />
      </div>
      <p className="activity-counter">{idx + 1} / {sentences.length}</p>

      <button
        className="sentence-match__display"
        onClick={() => speak(current.text, lang)}
        disabled={!voicesReady}
        dir={dir}
      >
        <span className="sentence-match__text">{current.text}</span>
      </button>

      <div className="sentence-match__options">
        {options.map((opt, i) => {
          let cls = 'sentence-match__option'
          if (checked && selectedIdx === i) {
            cls += opt.isCorrect ? ' correct' : ' wrong'
          } else if (checked && opt.isCorrect) {
            cls += ' correct-reveal'
          }
          return (
            <button key={opt.translation + i} className={cls} onClick={() => handleSelect(i)}>
              <span className="sentence-match__option-text">{opt.translation}</span>
              {checked && selectedIdx === i && (
                <span className="sentence-match__option-icon">
                  {opt.isCorrect ? <CheckIcon /> : <XIcon />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {checked && (
        <div className="activity-nav">
          <button
            className={`nav-arrow-btn ${isCorrect ? 'nav-arrow-btn--correct' : 'nav-arrow-btn--wrong'}`}
            onClick={handleNext}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
