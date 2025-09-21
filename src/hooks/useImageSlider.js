import { useState, useEffect } from 'react';

export const useImageSlider = (slides, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, slides.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const pause = () => setIsPlaying(false);
  const play = () => setIsPlaying(true);

  return {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrev,
    pause,
    play,
    isPlaying
  };
};
