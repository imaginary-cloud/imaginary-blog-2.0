'use client';

import { useState } from 'react';
import { PostsOrPages } from '@tryghost/content-api';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import Swiper React components
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
        <div className="absolute top-1/2 transform -translate-y-1/2 bottom-0 flex items-center justify-between z-20 overflow-visible w-full">
          <Button
            icon={<FaChevronLeft />}
            onClick={() => swiperRef?.slidePrev()}
            className="relative text-gray-800 p-2 rounded-full cursor-pointer"
          />
          <Button
            icon={<FaChevronRight />}
            onClick={() => swiperRef?.slideNext()}
            className="relative text-gray-800 p-2 rounded-full cursor-pointer"
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
