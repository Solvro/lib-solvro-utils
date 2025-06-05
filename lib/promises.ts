/**
 * Returns a promise that resolves after <ms> milliseconds
 *
 * @param ms how long to wait
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
