import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildReadingCourse, READING_COURSE_ID, ReadingLanguage } from '../data/courses'
import { useProgress } from '../contexts/ProgressContext'
import { AlphabetExplore } from '../components/activities/AlphabetExplore'
import { AlphabetRecognition } from '../components/activities/AlphabetRecognition'
import { AlphabetQuiz } from '../components/activities/AlphabetQuiz'
import { WordExplore } from '../components/activities/WordExplore'
import { WordMatch } from '../components/activities/WordMatch'
import { WordQuiz } from '../components/activities/WordQuiz'
import { SentenceExplore } from '../components/activities/SentenceExplore'
import { SentenceMatch } from '../components/activities/SentenceMatch'
import { SentenceQuiz } from '../components/activities/SentenceQuiz'
import { PassageRead } from '../components/activities/PassageRead'
import { PassageQuiz } from '../components/activities/PassageQuiz'

const ACTIVITY_LABELS: Record<string, string> = {
  explore: 'ui.activityExplore',
  recognition: 'ui.activityRecognition',
  quiz: 'ui.activityQuiz',
  'word-explore': 'ui.activityExplore',
  'word-match': 'ui.activityMatch',
  'word-quiz': 'ui.activityQuiz',
  'sentence-explore': 'ui.activityExplore',
  'sentence-match': 'ui.activityMatch',
  'sentence-quiz': 'ui.activityQuiz',
  'passage-read': 'ui.activityRead',
  'passage-quiz': 'ui.activityQuiz',
}

export function SectionView() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { t } = useTranslation()
  const { markSectionComplete, markActivityComplete, getCourseParam } = useProgress()
  const [activeIdx, setActiveIdx] = useState(0)

  const targetLanguage = (getCourseParam(READING_COURSE_ID, 'targetLanguage') ?? 'ar') as ReadingLanguage
  const course = buildReadingCourse(targetLanguage)
  const section = course.sections.find(s => s.id === sectionId)

  useEffect(() => { setActiveIdx(0) }, [sectionId])

  if (!section) {
    return <Navigate to={`/section/${course.sections[0].id}`} replace />
  }

  const handleActivityComplete = () => {
    const activity = section.activities[activeIdx]
    if (activity) markActivityComplete(section.id, activity.id)
    const next = activeIdx + 1
    if (next >= section.activities.length) {
      markSectionComplete(section.id)
    } else {
      setActiveIdx(next)
    }
  }

  const renderActivity = () => {
    const activity = section.activities[activeIdx]
    if (!activity) return <p className="muted">{t('ui.activitiesComingSoon')}</p>
    const c = activity.content
    switch (activity.type) {
      case 'explore':
        return <AlphabetExplore key={activeIdx} letters={c.letters} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'recognition':
        return <AlphabetRecognition key={activeIdx} letters={c.letters} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'quiz':
        return <AlphabetQuiz key={activeIdx} letters={c.letters} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'word-explore':
        return <WordExplore key={activeIdx} words={c.words} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'word-match':
        return <WordMatch key={activeIdx} words={c.words} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'word-quiz':
        return <WordQuiz key={activeIdx} words={c.words} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'sentence-explore':
        return <SentenceExplore key={activeIdx} sentences={c.sentences} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'sentence-match':
        return <SentenceMatch key={activeIdx} sentences={c.sentences} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'sentence-quiz':
        return <SentenceQuiz key={activeIdx} sentences={c.sentences} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'passage-read':
        return <PassageRead key={activeIdx} passages={c.passages} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      case 'passage-quiz':
        return <PassageQuiz key={activeIdx} passages={c.passages} lang={c.lang} dir={c.dir} onComplete={handleActivityComplete} />
      default:
        return <p className="muted">{t('ui.activitiesComingSoon')}</p>
    }
  }

  return (
    <div className="section-view section-view--wide">
      <h2 className="section-title">{t(section.nameKey)}</h2>

      <div className="activity-tabs">
        {section.activities.map((activity, i) => (
          <button
            key={activity.id}
            className={`activity-tab${i === activeIdx ? ' active' : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            {t(ACTIVITY_LABELS[activity.type] ?? activity.type)}
          </button>
        ))}
      </div>

      <div className="activity-body">
        {renderActivity()}
      </div>
    </div>
  )
}
