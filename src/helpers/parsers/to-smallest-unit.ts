/**
 * Returns smallest currency unit: positive integer, zero-decimal
 * @description For instance:
 * 1. 199.99 (float) equals 19999 in smallest unit
 * 2. 1.987 equals 199
 * 3. 1.9849444429999 equals 198
 * @TODO: Cover by unit tests
 */
const toSmallestUnit = (amount: number | string): number | undefined => {
  const parsedAmount = typeof amount === 'string' ? Number(amount) : amount;

  if (parsedAmount < 0) {
    return;
  }

  return Number(parsedAmount.toFixed(2)) * 100;
};

export default toSmallestUnit;
