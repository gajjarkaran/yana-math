export function getAnswerFormatHint(answer) {
  if (answer.includes(',') && !answer.includes('Area =')) {
    return 'Keep the items in order and separate them with commas.';
  }

  if (answer.includes(';') || /area\s*=|perimeter\s*=|d\s*=|x\s*[<>]=?/.test(answer.toLowerCase())) {
    return 'Include every part of the final answer, not just one piece of it.';
  }

  if (/[$]|cm|ft|m²|cm²|ft²|cm³|m³|units|liters|miles|inches|cups|girls|lawns|servings|questions|hamburger|ticket|marbles|feet|°c/i.test(answer)) {
    return 'Include units if the question asks for them.';
  }

  if (answer.includes(':')) {
    return 'Use ratio form with a colon and simplify if needed.';
  }

  if (answer.includes('/')) {
    return 'Fractions can be typed with a slash, like 3/4.';
  }

  return 'Use the final answer format the question is asking for.';
}
