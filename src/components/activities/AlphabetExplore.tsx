import { AlphabetLetter } from '../../data/alphabets/ar'
import { useAudio } from '../../hooks/useAudio'
import './AlphabetExplore.css'

interface Props {
  letters: AlphabetLetter[]
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

export function AlphabetExplore({ letters, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()

  return (
    <div className="explore">
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
      <div className="activity-nav activity-nav--explore">
        <button className="nav-arrow-btn" onClick={onComplete}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
