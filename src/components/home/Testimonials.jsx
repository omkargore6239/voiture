import React from 'react';
import { Star, Quote } from 'lucide-react';
import { siteData } from '../../data/siteData';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
      <Quote className="absolute top-4 right-4 text-primary-200" size={32} />
      
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="text-yellow-400 fill-current"
          />
        ))}
      </div>
      
      {/* Testimonial Text */}
      <p className="text-gray-700 leading-relaxed italic mb-6 text-base md:text-lg">
        "{testimonial.text}"
      </p>
      
      {/* Student Info */}
      <div className="border-t pt-4">
        <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
        <p className="text-gray-600 text-sm font-medium">{testimonial.course}</p>
        <p className="text-primary-600 text-sm font-semibold mt-1">{testimonial.achievement}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container-custom px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Read success stories from our students who achieved their dreams with our guidance and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteData.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
