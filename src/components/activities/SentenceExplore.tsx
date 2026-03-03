import { Sentence } from '../../data/sentences/ar'
import { useAudio } from '../../hooks/useAudio'
import './SentenceExplore.css'

interface Props {
  sentences: Sentence[]
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

export function SentenceExplore({ sentences, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()

  return (
    <div className="sentence-explore">
      <div className="sentence-explore__list">
        {sentences.map((s, i) => (
          <button
            key={i}
            className="sentence-card"
            onClick={() => speak(s.text, lang)}
            disabled={!voicesReady}
            dir={dir}
          >
            <span className="sentence-card__text">{s.text}</span>
            <span className="sentence-card__translation">{s.translation}</span>
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
