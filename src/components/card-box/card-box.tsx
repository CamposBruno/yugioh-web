import { Disclosure } from '@headlessui/react'
import { getPlaceholderCard } from '../../helpers/helpers';
import { IpfsCardDetails } from '../../services/ipfs/models'

export default function CardBox(props: any) {
  const card = props.card as IpfsCardDetails || new IpfsCardDetails(getPlaceholderCard(), '{CID}');
  const url = 'https://yugiohimg.s3.sa-east-1.amazonaws.com';
  const cardImage = card.Id ? `${url}/images/${card.Id}.jpg` : '/loader.svg';
    
  return(
    <Disclosure onClick={props.onClick} key={card.Id} as="div" className="w-full px-2 my-2 cursor-pointer	">
      <Disclosure as="img" id={card.Id} className=" h-auto w-full  object-cover" src={cardImage} loading="lazy" alt="" />
    </Disclosure>
  )
}