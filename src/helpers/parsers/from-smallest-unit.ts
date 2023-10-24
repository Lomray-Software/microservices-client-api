/**
 * Returns number from the smallest unit
 * @description For instance: 10099 (the smallest unit) equals 100.99 (float)
 */
const fromSmallestUnit = (smallestUnitAmount: string | number): number | undefined => {
  const parsedAmount =
    typeof smallestUnitAmount === 'string' ? Number(smallestUnitAmount) : smallestUnitAmount;

  if (parsedAmount < 0) {
    return;
  }

  return parsedAmount / 100;
};

export default fromSmallestUnit;
