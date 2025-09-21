import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { siteData } from '../../data/siteData';

const TestimonialCard = ({ testimonial, index, isVisible }) => {
  // Determine animation direction - alternating wave pattern
  const getAnimationDirection = (index) => {
    return index % 2 === 0 ? 'left' : 'right';
  };

  const direction = getAnimationDirection(index);
  
  return (
    <div 
      className={`bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-[1800ms] ease-out relative group ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : `opacity-0 ${direction === 'left' ? '-translate-x-24' : 'translate-x-24'} scale-95`
      }`}
      style={{ transitionDelay: `${300 + index * 250}ms` }}
    >
      {/* Quote Icon with Rotation Animation */}
      <Quote 
        className={`absolute top-4 right-4 text-primary-200 transition-all duration-[1400ms] ease-out ${
          isVisible 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-45 scale-75'
        }`}
        style={{ transitionDelay: `${600 + index * 250}ms` }}
        size={32} 
      />
      
      {/* Rating Stars with Sequential Animation */}
      <div 
        className={`flex items-center mb-4 transition-all duration-[1200ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${500 + index * 250}ms` }}
      >
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`text-yellow-400 fill-current transition-all duration-[800ms] ease-out ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-75'
            }`}
            style={{ transitionDelay: `${600 + index * 250 + i * 100}ms` }}
          />
        ))}
      </div>
      
      {/* Testimonial Text with Typewriter Effect */}
      <p 
        className={`text-gray-700 leading-relaxed italic mb-6 text-base md:text-lg transition-all duration-[1600ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: `${700 + index * 250}ms` }}
      >
        "{testimonial.text}"
      </p>
      
      {/* Student Info with Bottom-Up Animation */}
      <div 
        className={`border-t pt-4 transition-all duration-[1400ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${800 + index * 250}ms` }}
      >
        <h4 
          className={`font-bold text-gray-800 text-lg transition-all duration-[1000ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${850 + index * 250}ms` }}
        >
          {testimonial.name}
        </h4>
        <p 
          className={`text-gray-600 text-sm font-medium transition-all duration-[1000ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${900 + index * 250}ms` }}
        >
          {testimonial.course}
        </p>
        <p 
          className={`text-primary-600 text-sm font-semibold mt-1 transition-all duration-[1000ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${950 + index * 250}ms` }}
        >
          {testimonial.achievement}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div 
        className={`absolute inset-0 bg-gradient-primary opacity-0 rounded-xl transition-all duration-500 ${
          isVisible ? 'group-hover:opacity-5' : ''
        }`}
      />
    </div>
  );
};

const Testimonials = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
            }, 150);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -30px 0px' 
      }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden">
      <div className="container-custom px-4">
        {/* Header Section - Title from Left, Description from Right */}
        <div 
          className="text-center mb-8 md:mb-12"
          data-animate="header"
        >
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 transition-all duration-[1800ms] ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p 
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-[1600ms] ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Read success stories from our students who achieved their dreams with our guidance and support.
          </p>
        </div>
        
        {/* Testimonials Grid - Wave Animation Pattern */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          data-animate="testimonials"
        >
          {siteData.testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
              isVisible={visibleElements.has('testimonials')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
