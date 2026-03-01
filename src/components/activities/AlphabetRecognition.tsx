import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
  // Pick 3 distractors spaced apart
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
  // Stable shuffle seeded by idx
  return options.sort((a, b) =>
    (a.text.charCodeAt(0) + currentIdx) % 4 - (b.text.charCodeAt(0) + currentIdx) % 4
  )
}

export function AlphabetRecognition({ letters, lang, dir, onComplete }: Props) {
  const { t } = useTranslation()
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const current = letters[idx]
  const options = useMemo(() => buildOptions(letters, idx), [letters, idx])

  const handleSelect = (optIdx: number) => {
    if (checked) return
    setSelectedIdx(optIdx)
    speak(options[optIdx].text, lang)
  }

  const handleCheck = () => {
    if (selectedIdx === null) return
    setChecked(true)
  }

  const handleNext = () => {
    if (idx + 1 >= letters.length) {
      onComplete()
    } else {
      setIdx(idx + 1)
      setSelectedIdx(null)
      setChecked(false)
    }
  }

  const isCorrect = checked && selectedIdx !== null && options[selectedIdx].isCorrect

  return (
    <div className="recognition">
      <div className="activity-progress">
        <div
          className="activity-progress__bar"
          style={{ width: `${((idx + 1) / letters.length) * 100}%` }}
        />
      </div>
      <p className="activity-counter">
        {t('ui.letterOf', { current: idx + 1, total: letters.length })}
      </p>

      <p className="recognition__prompt">{t('ui.findWordWith')}</p>

      <div className="recognition__letter-display" dir={dir}>
        <span className="recognition__big-letter">{current.letter}</span>
        <span className="recognition__roman">{current.romanized}</span>
      </div>

      <div className="recognition__options">
        {options.map((opt, i) => {
          let cls = 'recognition__option'
          if (checked && selectedIdx === i) {
            cls += opt.isCorrect ? ' correct' : ' wrong'
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
              <span className="recognition__option-meaning">{opt.meaning}</span>
            </button>
          )
        })}
      </div>

      {!checked && (
        <button
          className="btn-primary"
          onClick={handleCheck}
          disabled={selectedIdx === null}
        >
          {t('ui.check')}
        </button>
      )}

      {checked && (
        <div className="activity-feedback">
          <span className={isCorrect ? 'feedback-correct' : 'feedback-wrong'}>
            {isCorrect ? t('ui.correct') : t('ui.wrong')}
          </span>
          <button className="btn-primary" onClick={handleNext}>
            {idx + 1 >= letters.length ? t('ui.finish') : t('ui.next')} →
          </button>
        </div>
      )}
    </div>
  )
}
