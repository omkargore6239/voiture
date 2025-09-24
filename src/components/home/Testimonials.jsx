import React, { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '../../data/siteData';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg min-h-[400px] flex flex-col group transition-shadow hover:shadow-xl duration-300">
      <div className="flex justify-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-lg group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80";
          }}
        />
      </div>
      <div className="flex justify-center items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-current mr-1" />
        ))}
      </div>
      <h4 className="font-bold text-blue-600 text-xl text-center mb-6">{testimonial.name}</h4>
      <div className="flex-grow flex items-center justify-center">
        <p className="text-gray-700 leading-relaxed text-center text-sm italic bg-gray-50 p-4 rounded-lg">{testimonial.text}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = siteData.testimonials;

  // Create groups of testimonials: 3 reviews, 3 reviews, 1 review
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonials.push(testimonials.slice(i, i + 3));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = groupedTestimonials.length - 1;

  // Auto advance the slider every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const goPrev = () => setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  const goNext = () => setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read success stories from our students who achieved their dreams with our guidance and support.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ width: `${groupedTestimonials.length * 100}%`, transform: `translateX(-${(currentIndex * 100) / groupedTestimonials.length}%)` }}
          >
            {groupedTestimonials.map((group, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / groupedTestimonials.length}%` }}
              >
                <div className={`grid ${group.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
                  {group.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonials"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {groupedTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
