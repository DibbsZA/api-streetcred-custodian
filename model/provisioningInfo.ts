
import { AgentEndpoint } from './agentEndpoint';


export interface ProvisioningInfo {
  issuerDid?: string;
  name?: string;
  imageUrl?: string;
  endpoint?: AgentEndpoint;
}
