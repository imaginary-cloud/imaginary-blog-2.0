'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { PostsOrPages } from '@tryghost/content-api';
import Card from './Card';

// Import Swiper styles
import 'swiper/css';

type SliderProps = {
  posts: PostsOrPages | void;
  title: string;
};

export default function Slider({ posts, title }: SliderProps) {
  return (
    <div className="mt-10">
      <h2>{title}</h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {posts?.map((post, index) => (
          <SwiperSlide key={index} className="flex !h-auto min-h-full">
            <Card data={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
