export interface PassageQuestion {
  question: string
  options: string[]
  correctIdx: number
}

export interface Passage {
  id: string
  title: string
  titleTranslation: string
  text: string
  translation: string
  questions: PassageQuestion[]
}

export const arPassages: Passage[] = [
  {
    id: 'my-house',
    title: 'بَيتي',
    titleTranslation: 'My House',
    text: 'بَيتي كَبير. في البَيت بَاب أَزرَق. أَنا أُحِبّ بَيتي. القِطّ في البَيت أَيضاً.',
    translation: 'My house is big. The house has a blue door. I love my house. The cat is in the house too.',
    questions: [
      { question: 'What color is the door?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctIdx: 0 },
      { question: 'What animal is in the house?', options: ['Dog', 'Bird', 'Cat', 'Fish'], correctIdx: 2 },
      { question: 'Is the house big or small?', options: ['Small', 'Big', 'Old', 'New'], correctIdx: 1 },
    ],
  },
  {
    id: 'the-sky',
    title: 'السَماء',
    titleTranslation: 'The Sky',
    text: 'الشَمس في السَماء. القَمَر جَميل في اللَيل. أَرى نُجوماً كَثيرَة. السَماء كَبيرَة.',
    translation: 'The sun is in the sky. The moon is beautiful at night. I see many stars. The sky is big.',
    questions: [
      { question: 'When is the moon beautiful?', options: ['In the morning', 'At night', 'At noon', 'In the evening'], correctIdx: 1 },
      { question: 'What does the narrator see many of?', options: ['Birds', 'Clouds', 'Stars', 'Trees'], correctIdx: 2 },
    ],
  },
  {
    id: 'at-school',
    title: 'في المَدرَسَة',
    titleTranslation: 'At School',
    text: 'أَنا في المَدرَسَة. أَقرَأ كِتَاباً. صَديقي يَقرَأ أَيضاً. نَحن نُحِبّ القِراءَة.',
    translation: 'I am at school. I read a book. My friend reads too. We love reading.',
    questions: [
      { question: 'Where is the narrator?', options: ['At home', 'At school', 'In the park', 'At the store'], correctIdx: 1 },
      { question: 'What do they love?', options: ['Writing', 'Playing', 'Reading', 'Drawing'], correctIdx: 2 },
    ],
  },
]
