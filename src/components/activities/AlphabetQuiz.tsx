import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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

export function AlphabetQuiz({ letters, lang, dir, onComplete }: Props) {
  const { t } = useTranslation()
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const current = letters[idx]
  const optionIndices = useMemo(() => buildLetterOptions(letters, idx), [letters, idx])

  useEffect(() => {
    if (!voicesReady) return
    const timer = setTimeout(() => speak(current.nameSimple, lang), 300)
    return () => clearTimeout(timer)
  }, [idx, current.nameSimple, lang, speak, voicesReady])

  const handleSelect = (letterIdx: number) => {
    if (checked) return
    setSelectedIdx(letterIdx)
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

  const isCorrect = checked && selectedIdx === idx

  return (
    <div className="quiz">
      <div className="activity-progress">
        <div
          className="activity-progress__bar"
          style={{ width: `${((idx + 1) / letters.length) * 100}%` }}
        />
      </div>
      <p className="activity-counter">
        {t('ui.letterOf', { current: idx + 1, total: letters.length })}
      </p>

      <div className="quiz__sound-row">
        <button
          className="quiz__play-btn"
          onClick={() => speak(current.nameSimple, lang)}
          aria-label={t('ui.replay')}
        >
          🔊
        </button>
        <p className="quiz__prompt">{t('ui.pickTheLetter')}</p>
      </div>

      <div className="quiz__options">
        {optionIndices.map((letterIdx) => {
          const letter = letters[letterIdx]
          let cls = 'quiz__option'
          if (checked && selectedIdx === letterIdx) {
            cls += letterIdx === idx ? ' correct' : ' wrong'
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
