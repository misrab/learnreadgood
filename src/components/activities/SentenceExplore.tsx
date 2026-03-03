import { useState } from 'react'
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

function tokenize(text: string) {
  const tokens: { text: string; start: number; end: number }[] = []
  let offset = 0
  for (const part of text.split(' ')) {
    if (part) tokens.push({ text: part, start: offset, end: offset + part.length })
    offset += part.length + 1
  }
  return tokens
}

export function SentenceExplore({ sentences, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const [activeChar, setActiveChar] = useState(-1)

  const handleSpeak = (s: Sentence, i: number) => {
    setPlayingIdx(i)
    setActiveChar(-1)
    speak(s.text, lang, 0.8, (charIndex) => {
      if (charIndex < 0) {
        setPlayingIdx(null)
        setActiveChar(-1)
      } else {
        setActiveChar(charIndex)
      }
    })
  }

  return (
    <div className="sentence-explore">
      <div className="sentence-explore__list">
        {sentences.map((s, i) => {
          const tokens = tokenize(s.text)
          const isPlaying = playingIdx === i

          return (
            <button
              key={i}
              className={`sentence-card${isPlaying ? ' sentence-card--playing' : ''}`}
              onClick={() => handleSpeak(s, i)}
              disabled={!voicesReady}
              dir={dir}
            >
              <span className="sentence-card__text">
                {tokens.map((tok, ti) => {
                  const isActive = isPlaying && activeChar >= tok.start && activeChar < tok.end
                  return (
                    <span key={ti} className={isActive ? 'word--active' : undefined}>
                      {tok.text}{ti < tokens.length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
              </span>
              <span className="sentence-card__translation">{s.translation}</span>
            </button>
          )
        })}
      </div>
      <div className="activity-nav activity-nav--explore">
        <button className="nav-arrow-btn" onClick={onComplete}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
