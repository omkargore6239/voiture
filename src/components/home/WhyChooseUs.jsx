import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle 
} from 'lucide-react';
import { siteData } from '../../data/siteData';

const WhyChooseUs = () => {
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
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom flex flex-col md:flex-row md:gap-12 md:items-center">
        {/* Left Image - Animated from left to right */}
        <div 
          className="md:w-1/2 mb-12 md:mb-0" 
          data-animate="image"
        >
          <div
            className={`transform transition-all duration-[1200ms] ease-out ${
              visibleElements.has('image') 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-16 scale-95'
            }`}
          >
            <img
              src="/whychooseus.jpg"
              alt="Why Choose Us Illustration"
              className={`w-full h-auto rounded-lg shadow-xl transform transition-all duration-[1000ms] ease-out ${
                visibleElements.has('image') 
                  ? 'scale-100 rotate-0' 
                  : 'scale-105 -rotate-1'
              }`}
              style={{ transitionDelay: '200ms' }}
              onError={(e) => {
                // Fallback image if original fails to load
                e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
        </div>

        {/* Right Content */}
        <div 
          className="md:w-1/2" 
          data-animate="content"
        >
          <div className="mb-8 text-center md:text-left">
            <span 
              className={`inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-red-400 mb-3 transition-all duration-[800ms] ease-out ${
                visibleElements.has('content') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              WHY CHOOSE US
            </span>
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition-all duration-[1200ms] ease-out ${
                visibleElements.has('content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Our courses will help you to achieve success
            </h2>
            <p
              className={`text-gray-600 text-base md:text-lg max-w-xl transition-all duration-[1000ms] ease-out ${
                visibleElements.has('content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
             Voiture Coaching Institute enhances individual and team performance, ensures training ROI, evaluates competencies, and addresses attrition, contributing to organizational success and asset retention. Join us for your better future development.
            </p>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            data-animate="features"
          >
            {siteData.whyChooseUs.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg p-6 flex gap-4 items-start shadow-md hover:shadow-lg transform transition-all duration-[1000ms] ease-out hover:scale-105 ${
                  visibleElements.has('features') 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-8' : 'translate-x-8'} translate-y-4`
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div 
                  className={`flex-shrink-0 text-red-400 mt-1 transform transition-all duration-[800ms] ease-out ${
                    visibleElements.has('features') 
                      ? 'scale-100 rotate-0' 
                      : 'scale-75 rotate-12'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h3 
                    className={`font-semibold text-gray-800 mb-2 transition-all duration-[700ms] ease-out ${
                      visibleElements.has('features') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${500 + index * 150}ms` }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className={`text-gray-700 text-sm transition-all duration-[600ms] ease-out ${
                      visibleElements.has('features') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
