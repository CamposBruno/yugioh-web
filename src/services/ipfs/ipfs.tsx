import axios from 'axios';
import { IpfsCardDetails } from './models'
import { createIpfsGatewayUrl } from './helpers';
import { IpfsCardDetailsInterface } from './interfaces';

const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs/{CID}';

export async function getCardDetails(cid: string, position: number): Promise<IpfsCardDetails> {
  const { data } = await axios.get<IpfsCardDetailsInterface>(createIpfsGatewayUrl(cid, ipfsGatewayUrl));
  return new IpfsCardDetails(data, ipfsGatewayUrl)
}