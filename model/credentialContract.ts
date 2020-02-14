
export interface CredentialContract {
  credentialId?: string;
  state?: CredentialContract.StateEnum;
  connectionId?: string;
  definitionId?: string;
  schemaId?: string;
  values?: { [key: string]: string; };
}
export namespace CredentialContract {
  export type StateEnum = 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked';
  export const StateEnum = {
    Offered: 'Offered' as StateEnum,
    Requested: 'Requested' as StateEnum,
    Issued: 'Issued' as StateEnum,
    Rejected: 'Rejected' as StateEnum,
    Revoked: 'Revoked' as StateEnum
  };
}
