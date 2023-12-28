'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PostsOrPages } from '@tryghost/content-api';
import { merriweather } from '@/lib/fonts';
import Card from '@/components/Card';
import Button from '@/components/Button';

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
    <div>
      <h2 className={`${merriweather.className} text-xl font-bold mb-10`}>
        {title}
      </h2>
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
            icon={<FaChevronLeft className="w-5 h-5 text-gray-700" />}
            onClick={() => swiperRef?.slidePrev()}
            className="relative text-gray-800 p-2 rounded-full cursor-pointer transition duration-300 transform group hover:shadow-md hover:bg-gradient-to-l from-white to-gray-200"
          />
          <Button
            icon={<FaChevronRight className="w-5 h-5 text-gray-700" />}
            onClick={() => swiperRef?.slideNext()}
            className="relative text-gray-800 p-2 rounded-full cursor-pointer transition duration-300 transform group hover:shadow-md hover:bg-gradient-to-r from-white to-gray-200"
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
