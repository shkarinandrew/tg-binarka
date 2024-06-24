export function generateRandomSign(): string {
  return Math.random() < 0.5 ? '-' : '+';
}
