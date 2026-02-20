
/**
 * Financial calculation utilities using standard compounding formulas.
 */

/**
 * Calculates the future value of a series of monthly payments (Subscription Opportunity Cost)
 * FV = P * ((1 + r)^n - 1) / r
 * @param monthlyPayment P
 * @param annualRate Default 0.07 (7%)
 * @param years n
 */
export function calculateFutureValue(monthlyPayment: number, annualRate: number = 0.07, years: number = 10): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  return monthlyPayment * (Math.pow(1 + r, n) - 1) / r;
}

/**
 * Calculates months to payoff for a debt given a monthly payment and APR
 * n = -log(1 - (B*r)/P) / log(1 + r)
 */
export function calculateMonthsToPayoff(balance: number, annualRate: number, monthlyPayment: number): number {
  const r = annualRate / 12;
  const P = monthlyPayment;
  const B = balance;

  if (r === 0) return B / P;
  if (P <= B * r) return Infinity; // Payment doesn't cover interest

  const months = -Math.log(1 - (B * r) / P) / Math.log(1 + r);
  return Math.ceil(months);
}

/**
 * Calculates total interest paid over the life of a debt
 */
export function calculateTotalInterest(balance: number, annualRate: number, monthlyPayment: number): number {
  const months = calculateMonthsToPayoff(balance, annualRate, monthlyPayment);
  if (months === Infinity) return Infinity;
  return (months * monthlyPayment) - balance;
}

/**
 * Generates an ID for a month (YYYY-MM)
 */
export function getMonthKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}
