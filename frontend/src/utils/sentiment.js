export function analyzeSentiment(text) {
  const negativeWords = [
    "hate", "angry", "disinherit", "force", "pressure", "threat", "not happy"
  ];

  const positiveWords = [
    "love", "happy", "trust", "care", "grateful"
  ];

  let score = 0;

  negativeWords.forEach(word => {
    if (text.toLowerCase().includes(word)) score -= 1;
  });

  positiveWords.forEach(word => {
    if (text.toLowerCase().includes(word)) score += 1;
  });

  if (score < 0) return "Negative";
  if (score > 0) return "Positive";
  return "Neutral";
}
