import { IpfsCardDetailsInterface } from "../services/ipfs/interfaces";

export function createIpfsGatewayUrl(cid: string, ipfsGatewayUrl: string){
  return ipfsGatewayUrl.replace('ipfs://', '').replace('{CID}', cid.replace('ipfs://', ''));
}

export async function delay(milis: number) {
  return new Promise((res) => {
    setTimeout(() => { res(true) }, milis)
  })
}

export function getPlaceholderCard(mock?: Partial<IpfsCardDetailsInterface> ): IpfsCardDetailsInterface {
  return {
    Id: 'back',
    Name: mock?.Name || '',
    Description: mock?.Description || 'Not able to found card',
    Type: mock?.Type || '',
    Archetype: mock?.Archetype || undefined,
    Attribute: mock?.Attribute || undefined,
    Race: mock?.Race || undefined,
    Attack: mock?.Attack || '0',
    Defense: mock?.Defense || '0',
    Level: mock?.Level || '0',
    Image: mock?.Image || '/images/back.jpg',
  }
}