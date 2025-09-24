import React, { useEffect, useRef } from 'react';

// Sample Images of clients from your project public/images/clients folder
const clientImages = [
  '/images/clients/client1.png',
  '/images/clients/client2.png',
  '/images/clients/client3.png',
  '/images/clients/client4.png',
  '/images/clients/client5.png',
  '/images/clients/client6.png',
  '/images/clients/client7.png',
  '/images/clients/client8.png'
];

const OurPlacements = () => {
  const scrollRef = useRef(null);

  // Continuous Horizontal Auto Scrolling Effect
  useEffect(() => {
    const scrollElement = scrollRef.current;
    let scrollAmount = 0;
    let rafId;

    const scrollStep = () => {
      if (!scrollElement) return;
      scrollAmount += 1;
      if (scrollAmount >= scrollElement.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollElement.scrollLeft = scrollAmount;
      rafId = requestAnimationFrame(scrollStep);
    };

    rafId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Placements</h2>
        <div 
          ref={scrollRef}
          className="flex overflow-hidden space-x-10 select-none cursor-pointer"
          style={{ scrollBehavior: 'smooth' }}
          aria-label="Clients logo scrolling banner"
        >
          {/* Duplicate images to enable infinite scroll illusion */}
          {[...clientImages, ...clientImages].map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
              <img 
                src={src} 
                alt={`Client logo ${idx + 1}`} 
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPlacements;
