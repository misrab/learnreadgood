import { useState, useEffect, useMemo } from 'react'
import { AlphabetLetter } from '../../data/alphabets/ar'
import { useAudio } from '../../hooks/useAudio'
import './AlphabetQuiz.css'

interface Props {
  letters: AlphabetLetter[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function buildLetterOptions(letters: AlphabetLetter[], currentIdx: number): number[] {
  const pool = letters.map((_, i) => i).filter((i) => i !== currentIdx)
  const step = Math.floor(pool.length / 3)
  const distractorIdxs = [
    pool[(currentIdx * 3) % pool.length],
    pool[(currentIdx * 3 + step) % pool.length],
    pool[(currentIdx * 3 + step * 2) % pool.length],
  ]
  const all = [currentIdx, ...distractorIdxs]
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

export function AlphabetQuiz({ letters, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = letters[idx]
  const optionIndices = useMemo(() => buildLetterOptions(letters, idx), [letters, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && selectedIdx === idx

  useEffect(() => {
    if (!voicesReady) return
    const timer = setTimeout(() => speak(current.nameSimple, lang), 300)
    return () => clearTimeout(timer)
  }, [idx, current.nameSimple, lang, speak, voicesReady])

  const handleSelect = (letterIdx: number) => {
    if (checked) return
    setSelectedIdx(letterIdx)
  }

  const handleNext = () => {
    if (idx + 1 >= letters.length) {
      onComplete()
    } else {
      setIdx(idx + 1)
      setSelectedIdx(null)
    }
  }

  return (
    <div className="quiz">
      <div className="activity-progress">
        <div
          className="activity-progress__bar"
          style={{ width: `${((idx + 1) / letters.length) * 100}%` }}
        />
      </div>
      <p className="activity-counter">{idx + 1} / {letters.length}</p>

      <div className="quiz__sound-row">
        <button
          className="quiz__play-btn"
          onClick={() => speak(current.nameSimple, lang)}
          aria-label="Play"
        >
          <PlayIcon />
        </button>
      </div>

      <div className="quiz__options">
        {optionIndices.map((letterIdx) => {
          const letter = letters[letterIdx]
          let cls = 'quiz__option'
          if (checked && selectedIdx === letterIdx) {
            cls += letterIdx === idx ? ' correct' : ' wrong'
          } else if (checked && letterIdx === idx) {
            cls += ' correct-reveal'
          } else if (!checked && selectedIdx === letterIdx) {
            cls += ' selected'
          }
          return (
            <button
              key={letter.letter}
              className={cls}
              onClick={() => handleSelect(letterIdx)}
              dir={dir}
            >
              <span className="quiz__option-letter">{letter.letter}</span>
              <span className="quiz__option-roman">{letter.romanized}</span>
              {checked && selectedIdx === letterIdx && (
                <span className="quiz__option-icon">
                  {letterIdx === idx ? <CheckIcon /> : <XIcon />}
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
