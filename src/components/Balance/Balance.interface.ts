export interface IBalance {
  value: number;
  isWin: boolean | null;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  isDisabled: boolean;
}
