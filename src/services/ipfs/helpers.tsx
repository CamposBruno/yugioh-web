export function createIpfsGatewayUrl(cid: string, ipfsGatewayUrl: string){
  return ipfsGatewayUrl.replace('ipfs://', '').replace('{CID}', cid.replace('ipfs://', ''));
}