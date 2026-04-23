export function calculateRisk(sentiment, fraudWarnings) {
  let risk = 0;

  // Sentiment weight
  if (sentiment === "Negative") risk += 40;
  if (sentiment === "Neutral") risk += 20;

  // Fraud weight
  risk += fraudWarnings.length * 15;

  // Cap at 100
  if (risk > 100) risk = 100;

  return risk;
}
