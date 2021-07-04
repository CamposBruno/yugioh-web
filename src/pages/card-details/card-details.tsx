import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Stars from '../../components/stars/stars'
import CardBox from '../../components/card-box/card-box';
import CardSlider from '../../components/card-slider/card-slider';
import CardDetailsList from '../../database/card-details/card-details.json'
import { IpfsCardDetailsInterface } from '../../services/ipfs/interfaces';
import { IpfsCardDetails } from '../../services/ipfs/models';
import { getPlaceholderCard } from '../../helpers/helpers';

function PageCardDetails() {
  const { id }: any = useParams();
  const [selectedCard, setSelectedCard] = useState<IpfsCardDetails>(new IpfsCardDetails({ Id : ''}, ''));
  
  useEffect(() => {
    const filterById = (card: any) => card.Id === id;
    const [filtered] = [...CardDetailsList as []].filter(filterById)

    setSelectedCard(new IpfsCardDetails(filtered, ''));
  }, [id]);

  const fetchCardWithCover = (item: any): JSX.Element[] => {
    const card = buildCardElement(item, 1);
    const cover = buildCardElement(getPlaceholderCard(item), 1, false, false);
    return [cover, card];
  }

  const buildCardElement = (item: IpfsCardDetailsInterface , position: number, description = false, selectable = true) => {
    const card = new IpfsCardDetails(item, '');
    
    return (
      <CardBox 
      key={card.Id}
      loop={true}
      position={position} 
      description={description}
      card={card}  
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="container mx-auto px-4 bg-gray-900 rounded-md p-10">
            <div style={{width: 450}} className="p-2 items-center mx-auto">
              <CardSlider autoplay={{ "delay": 500, "stopOnLastSlide" : true }} slidesPerView={1} effect={'flip'} cards={fetchCardWithCover(selectedCard)} navigation={false} />
            </div>
          </div>
        </div>
        
        <div>
          <div>
            <h1>{selectedCard.Name}</h1>
            <Stars level={selectedCard.Level} />
            <span>{selectedCard.Attribute}</span>
            <p>{selectedCard.Description}</p>
            <div className="flex flex-dr">
              <div>
                <span>Attack</span>
              </div>
              <div>
                <span>Defense</span>
              </div>
            </div>
            <div className="flex flex-dr">
              <div>
                <span>{selectedCard.Attack}</span>
              </div>
              <div>
              <span>{selectedCard.Defense}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCardDetails;
