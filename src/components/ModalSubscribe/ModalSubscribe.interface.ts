import { IModal } from '../Modal/Modal.interface';

export interface IModalSubscribe extends Omit<IModal, 'children'> {}
