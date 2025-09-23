export const mockFeedback = [
  {
    id: 1,
    patientId: 101,
    patientName: "John Doe",
    therapyId: 1,
    therapyType: "Virechana",
    rating: 4.5,
    sentiment: "positive",
    feedback: "The therapy session was very effective. I felt much better afterwards.",
    effectiveness: 5,
    comfortLevel: 4,
    practitionerRating: 5,
    followupRequired: false,
    date: "2025-09-20T10:00:00",
    tags: ["effective", "comfortable", "professional"],
    symptoms: ["headache", "stress"],
    improvementAreas: ["relaxation", "sleep quality"],
    recommendations: "Continue with weekly sessions"
  },
  {
    id: 2,
    patientId: 102,
    patientName: "Jane Smith",
    therapyId: 2,
    therapyType: "Basti",
    rating: 3.5,
    sentiment: "neutral",
    feedback: "The session was okay, but I expected more improvement.",
    effectiveness: 3,
    comfortLevel: 4,
    practitionerRating: 4,
    followupRequired: true,
    date: "2025-09-21T14:00:00",
    tags: ["moderate", "needs improvement"],
    symptoms: ["digestive issues"],
    improvementAreas: ["digestion"],
    recommendations: "Adjust therapy intensity"
  },
  // Add more mock feedback entries
  {
    id: 3,
    patientId: 103,
    patientName: "Alice Johnson",
    therapyId: 3,
    therapyType: "Nasya",
    rating: 5,
    sentiment: "very positive",
    feedback: "Excellent treatment! My sinuses feel completely clear.",
    effectiveness: 5,
    comfortLevel: 5,
    practitionerRating: 5,
    followupRequired: false,
    date: "2025-09-22T11:00:00",
    tags: ["excellent", "highly effective"],
    symptoms: ["sinus congestion", "headache"],
    improvementAreas: ["breathing", "head clarity"],
    recommendations: "Maintain current treatment plan"
  }
];

export const getFeedbackStats = (feedbackData) => {
  return {
    averageRating: feedbackData.reduce((acc, curr) => acc + curr.rating, 0) / feedbackData.length,
    totalFeedback: feedbackData.length,
    sentimentBreakdown: feedbackData.reduce((acc, curr) => {
      acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
      return acc;
    }, {}),
    therapyEffectiveness: feedbackData.reduce((acc, curr) => {
      acc[curr.therapyType] = acc[curr.therapyType] || { total: 0, count: 0 };
      acc[curr.therapyType].total += curr.effectiveness;
      acc[curr.therapyType].count += 1;
      return acc;
    }, {}),
    commonSymptoms: feedbackData.reduce((acc, curr) => {
      curr.symptoms.forEach(symptom => {
        acc[symptom] = (acc[symptom] || 0) + 1;
      });
      return acc;
    }, {}),
    followupRequired: feedbackData.filter(f => f.followupRequired).length
  };
};

export const feedbackTimeRanges = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
  ALL: 'all'
};

export const sentimentColors = {
  'very positive': '#2e7d32',
  'positive': '#4caf50',
  'neutral': '#ff9800',
  'negative': '#f44336',
  'very negative': '#d32f2f'
};