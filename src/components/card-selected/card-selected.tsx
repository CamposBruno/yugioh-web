import { Disclosure } from '@headlessui/react'
import { getPlaceholderCard } from '../../helpers/helpers';
import { IpfsCardDetails } from '../../services/ipfs/models'

export default function CardSelected(props: any) {

  const card = props.card as IpfsCardDetails || new IpfsCardDetails(getPlaceholderCard(), '{CID}');

  // lazy load images 
  setTimeout(() => {
    document.getElementById(card.Id)?.setAttribute('src', `/images/${card.Id}.jpg`);
  }, 200);
    
  return(
    <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
      <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
        <Disclosure as="img" id={card.Id} className="w-full object-cover" src='/loader.svg' loading="lazy" alt="" />
      </div>
      <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
      </div>
    </div>
  )
}