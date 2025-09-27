import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { siteData } from '../../data/siteData';

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-[300px] h-[400px] flex-shrink-0 transform transition-all duration-700 ease-in-out ${
      isActive ? 'scale-105 shadow-xl' : 'scale-100 hover:scale-105'
    }`}>
      
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full object-cover border-3 border-gray-200 mb-4 transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80";
          }}
        />
        
        <h4 className="font-semibold text-gray-800 text-lg mb-2">{testimonial.name}</h4>
        
        {/* Stars */}
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-current mx-0.5 transition-all duration-300 hover:scale-125" />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div className="text-center">
        <p className="text-gray-600 leading-relaxed text-sm">
          {testimonial.text}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = siteData.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  
  // Auto scroll functionality with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Smooth scroll to current testimonial with enhanced animation
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 324; // 300px card + 24px gap
      const scrollPosition = currentIndex * cardWidth;
      
      // Add a slight delay for smoother visual transition
      setTimeout(() => {
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our <span className="text-blue-600">Students Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read success stories from our students who achieved their dreams with our guidance and support.
          </p>
        </div>

        {/* Testimonials Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`animate-fadeInUp transition-all duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  scrollSnapAlign: 'center'
                }}
              >
                <TestimonialCard testimonial={testimonial} isActive={index === currentIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Enhanced smooth scrolling */
        .overflow-x-auto {
          scroll-padding: 0 50px;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;