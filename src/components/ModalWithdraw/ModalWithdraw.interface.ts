export interface IModalWithdraw {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  isDisabled: boolean;
}
