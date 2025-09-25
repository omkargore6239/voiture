import React, { useEffect, useRef } from 'react';

// 22 Client Images from your project public/images/client folder
const clientImages = [
  '/images/client/1.png',
  '/images/client/2.png',
  '/images/client/3.png',
  '/images/client/4.png',
  '/images/client/5.png',
  '/images/client/6.png',
  '/images/client/7.png',
  '/images/client/8.png',
  '/images/client/9.png',
  '/images/client/10.png',
  '/images/client/11.png',
  '/images/client/12.png',
  '/images/client/13.png',
  '/images/client/14.png',
  '/images/client/15.png',
  '/images/client/16.png',
  '/images/client/17.png',
  '/images/client/18.png',
  '/images/client/19.png',
  '/images/client/20.png',
  '/images/client/21.png',
  '/images/client/22.png'
];

const OurPlacements = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const speedRef = useRef(1.5); // Scrolling speed

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollPosition = 0;
    const maxScroll = scrollElement.scrollWidth / 2; // Half because we duplicate content

    const animate = () => {
      scrollPosition += speedRef.current;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollElement.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    scrollElement.addEventListener('mouseenter', handleMouseEnter);
    scrollElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollElement?.removeEventListener('mouseenter', handleMouseEnter);
      scrollElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Create doubled array for seamless loop
  const doubledImages = [...clientImages, ...clientImages];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Placements</h2>
          
        </div>
        
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white to-transparent z-10"></div>
          
          <div
            ref={scrollRef}
            className="flex overflow-hidden gap-8 py-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {doubledImages.map((src, idx) => (
              <div
                key={`${idx}-${idx < clientImages.length ? 'original' : 'duplicate'}`}
                className="flex-shrink-0 w-56 h-36 flex items-center justify-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 transform hover:scale-105"
              >
                <img
                  src={src}
                  alt={`Client company ${(idx % clientImages.length) + 1}`}
                  className="max-h-full max-w-full object-contain transition-all duration-300 hover:brightness-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const clientNum = (idx % clientImages.length) + 1;
                    e.target.src = `https://via.placeholder.com/200x120/f8f9fa/6c757d?text=Client+${clientNum}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPlacements;