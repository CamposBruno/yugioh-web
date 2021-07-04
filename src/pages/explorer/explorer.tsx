import React, {useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import CardBox from '../../components/card-box/card-box';
import CardDetailsList from '../../database/card-details/card-details-small.json'
import CardSlider from '../../components/card-slider/card-slider';
import { getPlaceholderCard } from '../../helpers/helpers';
import { IpfsCardDetailsInterface } from '../../services/ipfs/interfaces';
import { IpfsCardDetails } from '../../services/ipfs/models';

export default function ExplorerPage({history}: any) {
  const CARD_LIST: Array<IpfsCardDetailsInterface> = [...CardDetailsList as []];

  const [filteredCards, setFilteredCards] = useState<IpfsCardDetails[]>([]);
  const [search, setSearch] = useState<string>('');
  const location = useLocation();
  
  useEffect(() => {
    const { s } = queryString.parse(location.search)
    setSearch(s as string)
  }, [location])

  useEffect(() => {
    const filtered = fetchFilteredCards(search)
    setFilteredCards(filtered);
  }, [search])

  const buildCardElement = (item: IpfsCardDetailsInterface, position: number, description = false, selectable = true) => {
    const card = new IpfsCardDetails(item, '');
    
    return (
      <CardBox 
      key={card.Id}
      loop={true}
      position={position} 
      description={description}
      card={card}  
      onClick={() => selectable && history.push(`/card-details/${card.Id}`)}
      />
    )
  }

  const fetchFilteredCards = (filter?: string, len = 100): IpfsCardDetails[] => {
    const filterBySearch = (card: IpfsCardDetailsInterface) => 
      !filter || new RegExp(`^${filter}`).test(`${card.Name}`)

    const list = CARD_LIST
      .filter(filterBySearch)
      .splice(3, len)
    
    return list.map((item) => new IpfsCardDetails(item, ''))
  }

  const fetchCardWithCover = (item: any): JSX.Element[] => {
    const card = buildCardElement(item, 1);
    const cover = buildCardElement(getPlaceholderCard(item), 1, false, false);
    return [cover, card];
  }

  return (
  <>
    <div className="m-auto m-2">
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2">
      {filteredCards.map((card, index) =>
        <div style={{width: 250}} className="p-2 items-center mx-auto">
          <CardSlider 
            autoplay={{ "delay": 100 * index, "stopOnLastSlide" : true }} 
            slidesPerView={1} 
            effect={'flip'} 
            cards={fetchCardWithCover(card)} 
            navigation={false} /> 
        </div>
        )}
      </div>
    </div>
  </>
  )
}
