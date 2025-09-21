import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useImageSlider } from '../../hooks/useImageSlider';
import { siteData } from '../../data/siteData';

const HeroSection = () => {
  const {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrev,
    pause,
    play,
    isPlaying
  } = useImageSlider(siteData.heroSlides);

  const currentSlide = siteData.heroSlides[currentIndex];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
  {siteData.heroSlides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/banner1.jpg"
        alt={slide.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  ))}
</div>


      {/* Content */}
      <div className="relative z-10 text-center text-white container-custom px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          {currentSlide.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
          {currentSlide.subtitle}
        </p>
        <button className="btn-primary text-lg px-8 py-4 animate-fade-in">
          {currentSlide.cta}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={isPlaying ? pause : play}
        className="absolute top-4 right-4 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {siteData.heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
