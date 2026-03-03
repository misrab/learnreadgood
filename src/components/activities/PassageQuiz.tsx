import { useState } from 'react'
import { Passage } from '../../data/passages/ar'
import { useAudio } from '../../hooks/useAudio'
import './PassageQuiz.css'

interface Props {
  passages: Passage[]
  lang: string
  dir: 'ltr' | 'rtl'
  onComplete: () => void
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

export function PassageQuiz({ passages, lang, dir, onComplete }: Props) {
  const { speak, voicesReady } = useAudio()
  const [pIdx, setPIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const passage = passages[pIdx]
  const allQuestions = passages.flatMap((p, pi) =>
    p.questions.map((q, qi) => ({ ...q, passageIdx: pi, questionIdx: qi }))
  )
  const totalQ = allQuestions.length
  const currentQNum = passages.slice(0, pIdx).reduce((sum, p) => sum + p.questions.length, 0) + qIdx
  const question = passage.questions[qIdx]
  const checked = selectedIdx !== null
  const isCorrect = checked && selectedIdx === question.correctIdx

  const handleSelect = (optIdx: number) => {
    if (checked) return
    setSelectedIdx(optIdx)
  }

  const handleNext = () => {
    if (qIdx + 1 < passage.questions.length) {
      setQIdx(qIdx + 1)
      setSelectedIdx(null)
    } else if (pIdx + 1 < passages.length) {
      setPIdx(pIdx + 1)
      setQIdx(0)
      setSelectedIdx(null)
    } else {
      onComplete()
    }
  }

  return (
    <div className="passage-quiz">
      <div className="activity-progress">
        <div className="activity-progress__bar" style={{ width: `${((currentQNum + 1) / totalQ) * 100}%` }} />
      </div>
      <p className="activity-counter">{currentQNum + 1} / {totalQ}</p>

      <div className="passage-quiz__passage">
        <h3 className="passage-quiz__title" dir={dir}>{passage.title}</h3>
        <button
          className="passage-quiz__text"
          onClick={() => speak(passage.text, lang)}
          disabled={!voicesReady}
          dir={dir}
        >
          {passage.text}
        </button>
      </div>

      <p className="passage-quiz__question">{question.question}</p>

      <div className="passage-quiz__options">
        {question.options.map((opt, i) => {
          let cls = 'passage-quiz__option'
          if (checked && selectedIdx === i) {
            cls += i === question.correctIdx ? ' correct' : ' wrong'
          } else if (checked && i === question.correctIdx) {
            cls += ' correct-reveal'
          }
          return (
            <button key={opt} className={cls} onClick={() => handleSelect(i)}>
              <span className="passage-quiz__option-text">{opt}</span>
              {checked && selectedIdx === i && (
                <span className="passage-quiz__option-icon">
                  {i === question.correctIdx ? <CheckIcon /> : <XIcon />}
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
