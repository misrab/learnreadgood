import { useTranslation } from 'react-i18next'
import { AlphabetLetter } from '../../data/alphabets/ar'
import { useAudio } from '../../hooks/useAudio'
import './AlphabetExplore.css'

interface Props {
  letters: AlphabetLetter[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
}

export function AlphabetExplore({ letters, lang, dir, onComplete }: Props) {
  const { t } = useTranslation()
  const { speak, voicesReady } = useAudio()

  return (
    <div className="explore">
      <p className="explore__hint">{voicesReady ? t('ui.tapToHear') : '⏳'}</p>
      <div className="explore__grid">
        {letters.map((l) => (
          <div key={l.letter} className="letter-card">
            <button
              className="letter-card__main"
              onClick={() => speak(l.nameSimple, lang)}
              aria-label={l.romanized}
              disabled={!voicesReady}
            >
              <span className="letter-card__letter" dir={dir}>{l.letter}</span>
              <span className="letter-card__roman">{l.romanized}</span>
            </button>
            <div className="letter-card__words">
              {l.anchorWords.map((w) => (
                <button
                  key={w.text}
                  className="letter-card__word"
                  onClick={() => speak(w.text, lang)}
                  title={w.meaning}
                  dir={dir}
                  disabled={!voicesReady}
                >
                  {w.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="explore__footer">
        <button className="btn-primary" onClick={onComplete}>
          {t('ui.practiceNow')} →
        </button>
      </div>
    </div>
  )
}
