import { useState, useEffect, useMemo } from 'react'
import { Sentence } from '../../data/sentences/ar'
import { useAudio } from '../../hooks/useAudio'
import './SentenceQuiz.css'

interface Props {
  sentences: Sentence[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function buildOptions(sentences: Sentence[], currentIdx: number): number[] {
  const pool = sentences.map((_, i) => i).filter((i) => i !== currentIdx)
  const step = Math.max(1, Math.floor(pool.length / 2))
  const distractors = [
    pool[(currentIdx * 2) % pool.length],
    pool[(currentIdx * 2 + step) % pool.length],
  ]
  const all = [currentIdx, ...distractors]
  return all.sort((a, b) => (a + currentIdx) % 3 - (b + currentIdx) % 3)
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M8 5v14l11-7z"/>
    </svg>
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

export function SentenceQuiz({ sentences, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = sentences[idx]
  const optionIndices = useMemo(() => buildOptions(sentences, idx), [sentences, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && selectedIdx === idx

  useEffect(() => {
    if (!voicesReady) return
    const timer = setTimeout(() => speak(current.text, lang), 300)
    return () => clearTimeout(timer)
  }, [idx, current.text, lang, speak, voicesReady])

  const handleSelect = (sIdx: number) => {
    if (checked) return
    setSelectedIdx(sIdx)
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
    <div className="sentence-quiz">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((idx + 1) / sentences.length) * 100}%` }} />
      </div>
      <p className="activity-counter">{idx + 1} / {sentences.length}</p>

      <div className="sentence-quiz__sound-row">
        <button className="sentence-quiz__play-btn" onClick={() => speak(current.text, lang)} aria-label="Play">
          <PlayIcon />
        </button>
      </div>

      <div className="sentence-quiz__options">
        {optionIndices.map((sIdx) => {
          const s = sentences[sIdx]
          let cls = 'sentence-quiz__option'
          if (checked && selectedIdx === sIdx) {
            cls += sIdx === idx ? ' correct' : ' wrong'
          } else if (checked && sIdx === idx) {
            cls += ' correct-reveal'
          }
          return (
            <button key={sIdx} className={cls} onClick={() => handleSelect(sIdx)} dir={dir}>
              <span className="sentence-quiz__option-text">{s.text}</span>
              {checked && selectedIdx === sIdx && (
                <span className="sentence-quiz__option-icon">
                  {sIdx === idx ? <CheckIcon /> : <XIcon />}
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
