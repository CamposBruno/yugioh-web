import React, {useEffect, useState } from 'react'
import CardBox from '../../components/card-box/card-box';
import CardSlider from '../../components/card-slider/card-slider';
import CardDetailsList from '../../database/card-details/card-details-small.json'
import { getPlaceholderCard } from '../../helpers/helpers';
import { IpfsCardDetails } from '../../services/ipfs/models';
import { IpfsCardDetailsInterface } from '../../services/ipfs/interfaces';

const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs/{CID}';

export default function HomePage({history}: any) {

  const [filteredCardList, setFilteredCardList] = useState<JSX.Element[]>([]);
  const [dealCards, setDealCards] = useState<JSX.Element[]>([]);
  const [spellCards, setSpellCards] = useState<JSX.Element[]>([]);
  const [monsterCards, setMonsterCards] = useState<JSX.Element[]>([]);
  const [trapCards, setTrapCards] = useState<JSX.Element[]>([]);

  const slidesBreakPoints = {
    320: { slidesPerView : 3}, 
    640: { slidesPerView : 5}
  }

  useEffect(() => {
    const CARD_LIST: Array<IpfsCardDetailsInterface> = [...CardDetailsList as []];

    const fetchEpicCards = (quantity: number): JSX.Element[] => {
      const epics = CARD_LIST.splice(0, 3);    
      return epics.map((item, position) => buildCardElement(item, position))
    }
  
    const fetchCardByType = (type: string, len = 10): JSX.Element[] => {
      const filterByType = (card: any) => card.Type === type
      const list = CARD_LIST
        .filter(filterByType)
        .sort(() => Math.random() - 0.5)
        .splice(0, len)
      
      return list.map((item, position) => buildCardElement(item, position))
    }
  
    const fetchCoverCard = (): JSX.Element[] => {
      const cover = buildCardElement(getPlaceholderCard(), 1, false, false);
      return [cover];
    }

    const buildCardElement = (item: IpfsCardDetailsInterface, position: number, description = false, selectable = true) => {
      const card = new IpfsCardDetails(item, ipfsGatewayUrl);
      
      return (
        <CardBox 
        key={card.Id}
        loop={true}
        onClick={() => selectable && onSelectCard(card)} 
        position={position} 
        description={description}
        card={card}  
        />
      )
    }

    const onSelectCard = (card: IpfsCardDetails) => {
      history.push('/card-details/' + card.Id);
    }


    const filtered = fetchEpicCards(3);
    const deal = fetchCoverCard();
    const spells = fetchCardByType('Spell Card');
    const monsters = fetchCardByType('Normal Monster');
    const traps = fetchCardByType('Trap Card');
    setFilteredCardList(filtered);
    setDealCards(deal);
    setSpellCards(spells);
    setMonsterCards(monsters);
    setTrapCards(traps);
  }, [history]);


  return (
    <>
      <div className="mx-auto sm:px-6 lg:px-8">

        {/* Top cards of the week */}
        <section className="mt-10">
        <div className="grid gap-4 grid-cols-3 container mx-auto px-4">
            <div className="md:col-span-2 col-span-3">
              <div className="container mx-auto px-4">
                <p className="text-base text-red-600 font-semibold tracking-wide uppercase">Don't miss this opportunity</p>
                <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">Share and win an Epic NFT Card</h2>
              </div>
              <br />
              <div className="container mx-auto px-4">
                <CardSlider slidesPerView={3} cards={filteredCardList} navigation={false} />
              </div>
            </div>

            <div className="hidden md:block md:col-span-1 col-span-3 container mx-auto px-4 bg-gray-900 rounded-md p-10">
              <div className="container mx-auto px-4 text-center">
                <p className="text-base text-red-600 font-semibold tracking-wide uppercase">Log in to see</p>
                <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">Your Deck</h2>
              </div>
              <div style={{ width: 300 }} className="p-2 items-center mx-auto">
                <CardSlider slidesPerView={1} effect={'flip'} cards={dealCards} navigation={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Explore spell cards */}
        <section className="mt-10 container mx-auto px-4">
          <div className="">
            <p className="text-base text-red-600 font-semibold tracking-wide uppercase">Explore the </p>
            <p className="text-3xl text-gray-100 font-semibold tracking-wide">Spell cards</p>
          </div>
          <div className="">
            <CardSlider breakpoints={slidesBreakPoints} effect={'none'} cards={spellCards} navigation={false} />
          </div>
        </section>

        <section className="mt-10 container mx-auto px-4">
          <div className="">
            <p className="text-base text-red-600 font-semibold tracking-wide uppercase">Explore the </p>
            <p className="text-3xl text-gray-100 font-semibold tracking-wide">Monster cards</p>
          </div>
          <div className="">
            <CardSlider breakpoints={slidesBreakPoints} effect={'none'} cards={monsterCards} navigation={false} />
          </div>
        </section>

        <section className="mt-10 container mx-auto px-4">
          <div className="">
            <p className="text-base text-red-600 font-semibold tracking-wide uppercase">Explore the </p>
            <p className="text-3xl text-gray-100 font-semibold tracking-wide">Trap cards</p>
          </div>
          <div className="">
            <CardSlider  breakpoints={slidesBreakPoints} effect={'none'} cards={trapCards} navigation={false} />
          </div>
        </section>

        <section className="mt-10">
        <br /><br /><br /><br /><br />
      </section>
      </div>
    </>
  )
}
