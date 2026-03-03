import { Word } from '../../data/words/ar'
import { useAudio } from '../../hooks/useAudio'
import './WordExplore.css'

interface Props {
  words: Word[]
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

export function WordExplore({ words, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()

  return (
    <div className="word-explore">
      <div className="word-explore__grid">
        {words.map((w) => (
          <button
            key={w.text}
            className="word-card"
            onClick={() => speak(w.text, lang)}
            disabled={!voicesReady}
            dir={dir}
          >
            <span className="word-card__text">{w.text}</span>
            <span className="word-card__roman">{w.romanized}</span>
            <span className="word-card__meaning">{w.meaning}</span>
          </button>
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
