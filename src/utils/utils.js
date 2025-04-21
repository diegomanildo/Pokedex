export function capitalize(str) {
  if (!str || typeof str !== "string") return str;

  return str
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const ROMAN_MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

export function romanToInt(roman) {
  roman = roman.toUpperCase();
  let total = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = ROMAN_MAP[roman[i]];

    if (currentValue < prevValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }

    prevValue = currentValue;
  }

  return total;
}
