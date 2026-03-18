const FRACTION_MAP = {
  '¼': '1/4',
  '½': '1/2',
  '¾': '3/4',
  '⅐': '1/7',
  '⅑': '1/9',
  '⅒': '1/10',
  '⅓': '1/3',
  '⅔': '2/3',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
};

function normalizeAnswer(value) {
  return value
    .replace(/(\d)([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/g, '$1 $2')
    .normalize('NFKC')
    .replace(/[−–—]/g, '-')
    .replace(/[×]/g, 'x')
    .replace(/[÷]/g, '/')
    .replace(/[⁄]/g, '/')
    .replace(/[²]/g, '2')
    .replace(/[³]/g, '3')
    .replace(/[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (char) => FRACTION_MAP[char] || char)
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeMixedNumbers(value) {
  return value.replace(/\b(-?\d+)\s+(\d+)\/(\d+)\b/g, (_, whole, numerator, denominator) => {
    const wholeNumber = Number(whole);
    const numeratorNumber = Number(numerator);
    const denominatorNumber = Number(denominator);

    if (!denominatorNumber) return `${whole} ${numerator}/${denominator}`;

    const sign = wholeNumber < 0 ? -1 : 1;
    const absoluteWhole = Math.abs(wholeNumber);
    const improperNumerator = (absoluteWhole * denominatorNumber + numeratorNumber) * sign;
    return `${improperNumerator}/${denominatorNumber}`;
  });
}

function compactAnswer(value) {
  return normalizeMixedNumbers(normalizeAnswer(value)).replace(/\s+/g, '');
}

function addVariant(variants, value) {
  if (!value) return;
  const compact = compactAnswer(value);
  if (compact) variants.add(compact);
}

function addNumericVariant(variants, value) {
  const stripped = value.replace(/[$,]/g, '').trim();
  if (/^-?\d+(?:\.\d+)?$/.test(stripped)) {
    variants.add(String(Number(stripped)));
  }
}

function buildAcceptedVariants(answer) {
  const variants = new Set();
  const cleanedAnswer = answer.replace(/\s*\(e\.g\.[^)]+\)/gi, '').trim();

  addVariant(variants, answer);
  addVariant(variants, cleanedAnswer);
  addNumericVariant(variants, cleanedAnswer);

  if (cleanedAnswer.includes(' = ')) {
    const parts = cleanedAnswer.split('=').map((part) => part.trim()).filter(Boolean);
    parts.forEach((part) => {
      addVariant(variants, part);
      addNumericVariant(variants, part);
    });
  }

  if (cleanedAnswer.includes('. ')) {
    addVariant(variants, cleanedAnswer.split('. ')[0]);
  }

  if (/^[-$\d]/.test(cleanedAnswer)) {
    const numericPrefix = cleanedAnswer.match(/^\$?\s*-?\d+(?:\.\d+)?(?:\/\d+)?/);
    if (numericPrefix) {
      addVariant(variants, numericPrefix[0]);
      addNumericVariant(variants, numericPrefix[0]);
    }
  }

  if (/^\d+\s*[/:(]/.test(cleanedAnswer)) {
    addVariant(variants, cleanedAnswer);
  }

  return variants;
}

export function isAnswerCorrect(input, answer) {
  const normalizedInput = compactAnswer(input);
  if (!normalizedInput) return false;

  const acceptedVariants = buildAcceptedVariants(answer);
  if (acceptedVariants.has(normalizedInput)) return true;

  return Array.from(acceptedVariants).some((variant) => {
    if (normalizedInput.length < 2) return false;
    return variant.startsWith(normalizedInput) && /[a-z]/.test(variant);
  });
}
