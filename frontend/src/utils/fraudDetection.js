export function detectFraud(beneficiaries) {
  let warnings = [];

  // Check uneven distribution
  const total = beneficiaries.reduce((sum, b) => sum + b.share, 0);
  if (total !== 100) {
    warnings.push("Total share is not 100%");
  }

  // Check suspicious dominance
  beneficiaries.forEach(b => {
    if (b.share > 80) {
      warnings.push(`${b.name} has unusually high share`);
    }
  });

  // Check too many changes (simulate)
  if (beneficiaries.length > 5) {
    warnings.push("Too many beneficiaries added");
  }

  return warnings;
}
