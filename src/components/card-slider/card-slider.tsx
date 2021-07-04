import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/swiper.min.css";
import "swiper/components/effect-flip/effect-flip.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import SwiperCore, { Autoplay, EffectCoverflow, EffectFlip, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow, EffectFlip, Pagination, Navigation]);

export default function CardSlider(props: any) {
  const cards: JSX.Element[] = props.cards;
  const slidesPerView: number = props.slidesPerView;
  let coverflowEffect;
  const effect: 'coverflow' | 'flip' = props.effect || 'coverflow';
  const navigation: boolean = props.navigation || false;
  const pagination: boolean = props.pagination || false;
  const autoplay = props.autoplay || undefined;

  const breakpoints: {} = props.breakpoints || undefined;

  if (effect === 'coverflow'){
    coverflowEffect = {
      "rotate": 45,
      "stretch": 50,
      "depth": 100,
      "modifier": 1,
      "slideShadows": false
    }
  }

  return (
    <>
    <Swiper 
      className="pt-5" 
      pagination={pagination} 
      slidesPerView={slidesPerView} 
      navigation={navigation} 
      effect={effect} 
      grabCursor={true} 
      centeredSlides={false}
      coverflowEffect={coverflowEffect} 
      autoplay={autoplay}
      breakpoints={breakpoints}
      >
      {cards.map((card, position) => (
        <SwiperSlide className="pt-5" key={position} virtualIndex={position}>
          {card}
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  )
}