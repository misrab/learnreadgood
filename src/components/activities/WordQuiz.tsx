import { useState, useEffect, useMemo } from 'react'
import { Word } from '../../data/words/ar'
import { useAudio } from '../../hooks/useAudio'
import './WordQuiz.css'

interface Props {
  words: Word[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function buildOptions(words: Word[], currentIdx: number): number[] {
  const pool = words.map((_, i) => i).filter((i) => i !== currentIdx)
  const step = Math.max(1, Math.floor(pool.length / 3))
  const distractors = [
    pool[(currentIdx * 3) % pool.length],
    pool[(currentIdx * 3 + step) % pool.length],
    pool[(currentIdx * 3 + step * 2) % pool.length],
  ]
  const all = [currentIdx, ...distractors]
  return all.sort((a, b) => (a + currentIdx) % 4 - (b + currentIdx) % 4)
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

export function WordQuiz({ words, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = words[idx]
  const optionIndices = useMemo(() => buildOptions(words, idx), [words, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && selectedIdx === idx

  useEffect(() => {
    if (!voicesReady) return
    const timer = setTimeout(() => speak(current.text, lang), 300)
    return () => clearTimeout(timer)
  }, [idx, current.text, lang, speak, voicesReady])

  const handleSelect = (wordIdx: number) => {
    if (checked) return
    setSelectedIdx(wordIdx)
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
    <div className="word-quiz">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((idx + 1) / words.length) * 100}%` }} />
      </div>
      <p className="activity-counter">{idx + 1} / {words.length}</p>

      <div className="word-quiz__sound-row">
        <button className="word-quiz__play-btn" onClick={() => speak(current.text, lang)} aria-label="Play">
          <PlayIcon />
        </button>
      </div>

      <div className="word-quiz__options">
        {optionIndices.map((wIdx) => {
          const word = words[wIdx]
          let cls = 'word-quiz__option'
          if (checked && selectedIdx === wIdx) {
            cls += wIdx === idx ? ' correct' : ' wrong'
          } else if (checked && wIdx === idx) {
            cls += ' correct-reveal'
          }
          return (
            <button key={word.text} className={cls} onClick={() => handleSelect(wIdx)} dir={dir}>
              <span className="word-quiz__option-text">{word.text}</span>
              <span className="word-quiz__option-roman">{word.romanized}</span>
              {checked && selectedIdx === wIdx && (
                <span className="word-quiz__option-icon">
                  {wIdx === idx ? <CheckIcon /> : <XIcon />}
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
