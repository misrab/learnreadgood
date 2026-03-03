import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Passage } from '../../data/passages/ar'
import { useAudio } from '../../hooks/useAudio'
import './PassageRead.css'

interface Props {
  passages: Passage[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PassageRead({ passages, lang, dir, onComplete }: Props) {
  const { t } = useTranslation()
  const { speak, voicesReady } = useAudio()
  const [idx, setIdx] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

  const passage = passages[idx]

  const handleNext = () => {
    if (idx + 1 >= passages.length) {
      onComplete()
    } else {
      setIdx(idx + 1)
      setShowTranslation(false)
    }
  }

  return (
    <div className="passage-read">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((idx + 1) / passages.length) * 100}%` }} />
      </div>
      <p className="activity-counter">{idx + 1} / {passages.length}</p>

      <div className="passage-read__card">
        <h3 className="passage-read__title" dir={dir}>{passage.title}</h3>
        <p className="passage-read__title-sub">{passage.titleTranslation}</p>

        <button
          className="passage-read__text"
          onClick={() => speak(passage.text, lang)}
          disabled={!voicesReady}
          dir={dir}
        >
          {passage.text}
        </button>

        <button
          className="passage-read__toggle"
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? t('ui.hideTranslation') : t('ui.showTranslation')}
        </button>

        {showTranslation && (
          <p className="passage-read__translation">{passage.translation}</p>
        )}
      </div>

      <div className="activity-nav">
        <button className="nav-arrow-btn" onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
