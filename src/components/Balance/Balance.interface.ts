export interface IBalance {
  value: number;
  isWin: boolean | null;
  setBalance: (balance: number) => void;
}
