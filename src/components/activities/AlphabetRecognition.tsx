import { useState, useMemo } from 'react'
import { AlphabetLetter } from '../../data/alphabets/ar'
import { useAudio } from '../../hooks/useAudio'
import './AlphabetRecognition.css'

interface Props {
  letters: AlphabetLetter[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

interface Option {
  text: string
  meaning: string
  isCorrect: boolean
}

function buildOptions(letters: AlphabetLetter[], currentIdx: number): Option[] {
  const correct = letters[currentIdx].anchorWords[0]
  const pool = letters
    .filter((_, i) => i !== currentIdx)
    .map((l) => l.anchorWords[0])
  const step = Math.floor(pool.length / 3)
  const distractors = [
    pool[(currentIdx * 3) % pool.length],
    pool[(currentIdx * 3 + step) % pool.length],
    pool[(currentIdx * 3 + step * 2) % pool.length],
  ]

  const options: Option[] = [
    { ...correct, isCorrect: true },
    ...distractors.map((d) => ({ ...d, isCorrect: false })),
  ]
  return options.sort((a, b) =>
    (a.text.charCodeAt(0) + currentIdx) % 4 - (b.text.charCodeAt(0) + currentIdx) % 4
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

export function AlphabetRecognition({ letters, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = letters[idx]
  const options = useMemo(() => buildOptions(letters, idx), [letters, idx])
  const checked = selectedIdx !== null
  const isCorrect = checked && options[selectedIdx!]?.isCorrect

  const handleSelect = (optIdx: number) => {
    if (checked) return
    setSelectedIdx(optIdx)
    speak(options[optIdx].text, lang)
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
    <div className="recognition">
      <div className="activity-progress">
        <div
          className="activity-progress__bar"
          style={{ width: `${((idx + 1) / letters.length) * 100}%` }}
        />
      </div>
      <p className="activity-counter">{idx + 1} / {letters.length}</p>

      <div className="recognition__letter-display" dir={dir}>
        <span className="recognition__big-letter">{current.letter}</span>
        <span className="recognition__roman">{current.romanized}</span>
      </div>

      <div className="recognition__options">
        {options.map((opt, i) => {
          let cls = 'recognition__option'
          if (checked && selectedIdx === i) {
            cls += opt.isCorrect ? ' correct' : ' wrong'
          } else if (checked && opt.isCorrect) {
            cls += ' correct-reveal'
          } else if (!checked && selectedIdx === i) {
            cls += ' selected'
          }
          return (
            <button
              key={opt.text}
              className={cls}
              onClick={() => handleSelect(i)}
              dir={dir}
              disabled={!voicesReady}
            >
              <span className="recognition__option-text">{opt.text}</span>
              {checked && selectedIdx === i && (
                <span className="recognition__option-icon">
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
