
import { AgentEndpoint } from './agentEndpoint';


export interface ConnectionContract {
  connectionId?: string;
  name?: string;
  imageUrl?: string;
  myDid?: string;
  theirDid?: string;
  myKey?: string;
  theirKey?: string;
  state?: ConnectionContract.StateEnum;
  invitation?: string;
  invitationUrl?: string;
  endpoint?: AgentEndpoint;
  createdAtUtc?: Date;
}
export namespace ConnectionContract {
  export type StateEnum = 'Invited' | 'Negotiating' | 'Connected';
  export const StateEnum = {
    Invited: 'Invited' as StateEnum,
    Negotiating: 'Negotiating' as StateEnum,
    Connected: 'Connected' as StateEnum
  };
}
