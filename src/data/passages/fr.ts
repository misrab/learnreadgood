import { Passage } from './ar'

export const frPassages: Passage[] = [
  {
    id: 'my-house',
    title: 'Ma Maison',
    titleTranslation: 'My House',
    text: 'Ma maison est grande. La maison a une porte bleue. J\'aime ma maison. Le chat est dans la maison aussi.',
    translation: 'My house is big. The house has a blue door. I love my house. The cat is in the house too.',
    questions: [
      { question: 'What color is the door?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctIdx: 0 },
      { question: 'What animal is in the house?', options: ['Dog', 'Bird', 'Cat', 'Fish'], correctIdx: 2 },
      { question: 'Is the house big or small?', options: ['Small', 'Big', 'Old', 'New'], correctIdx: 1 },
    ],
  },
  {
    id: 'the-sky',
    title: 'Le Ciel',
    titleTranslation: 'The Sky',
    text: 'Le soleil est dans le ciel. La lune est belle la nuit. Je vois beaucoup d\'étoiles. Le ciel est grand.',
    translation: 'The sun is in the sky. The moon is beautiful at night. I see many stars. The sky is big.',
    questions: [
      { question: 'When is the moon beautiful?', options: ['In the morning', 'At night', 'At noon', 'In the evening'], correctIdx: 1 },
      { question: 'What does the narrator see many of?', options: ['Birds', 'Clouds', 'Stars', 'Trees'], correctIdx: 2 },
    ],
  },
  {
    id: 'at-school',
    title: 'À l\'École',
    titleTranslation: 'At School',
    text: 'Je suis à l\'école. Je lis un livre. Mon ami lit aussi. Nous aimons lire.',
    translation: 'I am at school. I read a book. My friend reads too. We love reading.',
    questions: [
      { question: 'Where is the narrator?', options: ['At home', 'At school', 'In the park', 'At the store'], correctIdx: 1 },
      { question: 'What do they love?', options: ['Writing', 'Playing', 'Reading', 'Drawing'], correctIdx: 2 },
    ],
  },
]
