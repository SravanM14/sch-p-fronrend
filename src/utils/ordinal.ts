export const getOrdinalSuffix = (value: number): string => {
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  return ["th", "st", "nd", "rd"][value % 10] ?? "th";
};