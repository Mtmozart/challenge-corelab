import { useState } from 'react';
import { CardHome } from '../card-home/CardHome';
import styles from './carousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export interface CarouselProps {
  cards: Array<{
    image: string;
    title: string;
    description: string;
  }>;
}

export function Carousel({ cards }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <section className={styles.carousel__content}>
      <button onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <div className={styles.carousel__content__card}>
        <CardHome
          image={cards[currentIndex].image}
          title={cards[currentIndex].title}
          description={cards[currentIndex].description}
        />
      </div>
      <button onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
}
