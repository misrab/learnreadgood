import { useState, useMemo } from 'react'
import { Word } from '../../data/words/ar'
import { useAudio } from '../../hooks/useAudio'
import './WordMatch.css'

interface Props {
  words: Word[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function buildOptions(words: Word[], currentIdx: number): { meaning: string; isCorrect: boolean }[] {
  const correct = words[currentIdx].meaning
  const pool = words.filter((_, i) => i !== currentIdx).map((w) => w.meaning)
  const step = Math.max(1, Math.floor(pool.length / 3))
  const distractors = [
    pool[(currentIdx * 3) % pool.length],
    pool[(currentIdx * 3 + step) % pool.length],
    pool[(currentIdx * 3 + step * 2) % pool.length],
  ]
  const options = [
    { meaning: correct, isCorrect: true },
    ...distractors.map((m) => ({ meaning: m, isCorrect: false })),
  ]
  return options.sort((a, b) =>
    (a.meaning.charCodeAt(0) + currentIdx) % 4 - (b.meaning.charCodeAt(0) + currentIdx) % 4
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

export function WordMatch({ words, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = words[idx]
  const options = useMemo(() => buildOptions(words, idx), [words, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && options[selectedIdx!]?.isCorrect

  const handleSelect = (optIdx: number) => {
    if (checked) return
    setSelectedIdx(optIdx)
  }

  const handleNext = () => {
    if (idx + 1 >= words.length) {
      onComplete()
    } else {
      setIdx(idx + 1)
      setSelectedIdx(null)
    }
  }

  return (
    <div className="word-match">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((idx + 1) / words.length) * 100}%` }} />
      </div>
      <p className="activity-counter">{idx + 1} / {words.length}</p>

      <button
        className="word-match__display"
        onClick={() => speak(current.text, lang)}
        disabled={!voicesReady}
        dir={dir}
      >
        <span className="word-match__big-text">{current.text}</span>
        <span className="word-match__roman">{current.romanized}</span>
      </button>

      <div className="word-match__options">
        {options.map((opt, i) => {
          let cls = 'word-match__option'
          if (checked && selectedIdx === i) {
            cls += opt.isCorrect ? ' correct' : ' wrong'
          } else if (checked && opt.isCorrect) {
            cls += ' correct-reveal'
          }
          return (
            <button key={opt.meaning + i} className={cls} onClick={() => handleSelect(i)}>
              <span className="word-match__option-text">{opt.meaning}</span>
              {checked && selectedIdx === i && (
                <span className="word-match__option-icon">
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
