export const DUMMY_FLAGS_URLS = [
  'https://s3.amazonaws.com/mc-canvas/Nz3ltKr0JWPreQdwmvTuSxVYOXdKnVfAxlx0VuLm.png',
  'https://s3.amazonaws.com/mc-canvas/5wGOjegceggXBjShQngKrHfWVbxFZ2jLpu2eOmvA.png',
  'https://s3.amazonaws.com/mc-canvas/rtPHLL7iVUoKcq0ZpBP3pE06I4y5tl92kcYYWb6q.png',
]

export const DUMMY_SIM_CARDS = [
  {
    id: '1',
    usedData: '750 MB',
    dataPlan: '1GB',
    countryName: 'Estados Unidos',
    daysLeft: '2',
    active: true,
    flagImageUri: DUMMY_FLAGS_URLS[0],
    planDays: '10',
  },
  {
    id: '2',
    usedData: '750 MB',
    dataPlan: '2GB',
    countryName: 'Ecuador',
    daysLeft: '2',
    active: true,
    flagImageUri: DUMMY_FLAGS_URLS[1],
    planDays: '10',
  },
  {
    id: '3',
    usedData: '750 MB',
    dataPlan: '2GB',
    countryName: 'España',
    daysLeft: '2',
    active: false,
    flagImageUri: DUMMY_FLAGS_URLS[2],
    planDays: '10',
  },
]
