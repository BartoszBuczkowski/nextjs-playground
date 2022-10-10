export function isNumeric(string: string) {
  try {
    const isNumericString = !isNaN(Number(string));
    return isNumericString;
  } catch {
    return false;
  }
}
