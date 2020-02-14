
export interface VerificationContract {
  connectionId?: string;
  verificationId?: string;
  state?: VerificationContract.StateEnum;
  createdAtUtc?: Date;
  updatedAtUtc?: Date;
  isValid?: boolean;
  verifiedAtUtc?: Date;
}
export namespace VerificationContract {
  export type StateEnum = 'Requested' | 'Accepted' | 'Rejected';
  export const StateEnum = {
    Requested: 'Requested' as StateEnum,
    Accepted: 'Accepted' as StateEnum,
    Rejected: 'Rejected' as StateEnum
  };
}
