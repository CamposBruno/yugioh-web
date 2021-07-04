import { IpfsCardDetailsInterface } from "./interfaces";
import { createIpfsGatewayUrl } from './helpers';

export class IpfsCardDetails implements IpfsCardDetailsInterface {
  Id: string;
  Type: string | undefined;
  Description: string | undefined;
  Attack: string | undefined;
  Defense: string | undefined;
  Level: string | undefined;
  Race: string | undefined;
  Attribute: string | undefined;
  Archetype: string | undefined;
  Name: string | undefined;
  Image: string | undefined;

  constructor(card: IpfsCardDetailsInterface, private readonly ipfsGatewayUrl: string) {
    this.Id = card.Id;
    this.Type = card.Type;
    this.Description = card.Description;
    this.Attack = card.Attack;
    this.Defense = card.Defense;
    this.Level = card.Level;
    this.Race = card.Race;
    this.Attribute = card.Attribute;
    this.Archetype = card.Archetype;
    this.Name = card.Name;
    this.Image = card.Image;
  }

  get ImageUrl (): string  {
    return createIpfsGatewayUrl(this.Image + '', this.ipfsGatewayUrl);
  }

    
}