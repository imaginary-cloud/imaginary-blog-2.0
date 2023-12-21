'use client';

import { useState } from 'react';
import { PostsOrPages } from '@tryghost/content-api';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

// Import Swiper React components
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// register Swiper custom elements
register();

type SliderProps = {
  posts: PostsOrPages | void;
  title: string;
};

export default function Slider({ posts, title }: SliderProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  if (!posts?.length) return;

  return (
    <div className="mt-10">
      <h2>{title}</h2>
      <Swiper
        className="relative !z-0 overflow-visible"
        onSwiper={(swiper) => setSwiperRef(swiper)}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        navigation
      >
        <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full z-100">
          <Button
            icon={<FaChevronCircleLeft />}
            onClick={() => swiperRef?.slidePrev()}
            className="absolute right-[-20px] bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          />
          <Button
            icon={<FaChevronCircleRight />}
            onClick={() => swiperRef?.slideNext()}
            className="absolute left-[-20px] bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          />
        </div>

        {posts?.map((post, index) => (
          <SwiperSlide key={index} className="flex !h-auto min-h-full">
            <Card data={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
