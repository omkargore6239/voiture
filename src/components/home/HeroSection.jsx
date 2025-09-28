import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Direct image paths from public/images/hero/ folder
  const heroSlides = [
    {
      id: 1,
      image: '/images/hero/slider 101.jpg',
      title: null
    },
    {
      id: 2,
      image: '/images/hero/slider 102.jpg',
      title: null
    },
    {
      id: 3,
      image: '/images/hero/slider 104.jpg',
      title: null
    },
    {
      id: 4,
      image: '/images/hero/slider 105.jpg',
      title: null
    }
  ];

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = heroSlides.length;
        
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    heroSlides.forEach((slide) => {
      const img = new window.Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = slide.image;
    });
  }, []);

  // Auto slide functionality for both mobile and desktop
  useEffect(() => {
    if (!imagesLoaded || heroSlides.length <= 1) return;
        
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroSlides.length;
        console.log('Auto sliding to index:', nextIndex); // Debug log
        return nextIndex;
      });
    }, 4000); // 4 seconds for auto sliding

    return () => clearInterval(timer);
  }, [imagesLoaded]);

  // Manual slide navigation
  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  if (!heroSlides || heroSlides.length === 0) {
    return <div className="w-full h-[240px] md:h-screen bg-gray-200"></div>;
  }

  return (
    <section className="w-full relative overflow-hidden">
      {/* HERO SLIDER - Mobile Only */}
      <div className="block md:hidden w-full relative bg-white overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-[190px] sm:h-[240px] w-full overflow-hidden rounded-b-xl">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              width: `${heroSlides.length * 100}%`,
              transform: `translateX(-${(currentIndex * 100) / heroSlides.length}%)`
            }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="flex-none h-full bg-white flex items-center justify-center"
                style={{ width: `${100 / heroSlides.length}%` }}
              >
                <img
                  src={slide.image}
                  alt={`Hero ${idx + 1}`}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${
                    imagesLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
                
        {/* Mobile Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-gray-300 shadow ${
                idx === currentIndex ? 'bg-[#fdab01]' : 'bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
                
        {/* Mobile Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-30">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-orange-300"></div>
          </div>
        )}
      </div>
            
      {/* DESKTOP HERO - Full Screen Auto Slider */}
      <div className="hidden md:block w-full h-screen relative overflow-hidden bg-gray-900">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            width: `${heroSlides.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / heroSlides.length}%)`
          }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id || `desktop-${idx}`}
              className="flex-none h-full relative"
              style={{ width: `${100 / heroSlides.length}%` }}
            >
              <img
                src={slide.image}
                alt={`Hero Desktop ${idx + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imagesLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                decoding="async"
              />
              {/* Optional: Add slide content overlay */}
              {slide.title && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
                    {slide.title}
                  </h2>
                </div>
              )}
            </div>
          ))}
        </div>
                
        {/* Desktop Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentIndex - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
                
        <button
          onClick={() => goToSlide((currentIndex + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
                
        {/* Desktop Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 shadow-lg hover:scale-110 ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
                
        {/* Desktop Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
              <p className="text-white text-lg">Loading Images...</p>
            </div>
          </div>
        )}
                
        {/* Slide Counter */}
        <div className="absolute top-6 right-6 bg-black/30 text-white px-4 py-2 rounded-full text-sm z-10">
          {currentIndex + 1} / {heroSlides.length}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;