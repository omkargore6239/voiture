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
        {/* Left Image */}
        <div className="md:w-1/2 mb-12 md:mb-0" data-animate="image">
          <img
            src="/whychooseus.jpg"
            alt="Why Choose Us Illustration"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2" data-animate="content">
          <div className="mb-8 text-center md:text-left">
            <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-red-400 mb-3">
              WHY CHOOSE US
            </span>
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition-all duration-[1800ms] ease-out ${
                visibleElements.has('content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
              data-animate="header-title"
            >
              Our courses will help you to achieve success
            </h2>
            <p
              className={`text-gray-600 text-base md:text-lg max-w-xl transition-all duration-[1600ms] ease-out ${
                visibleElements.has('content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '300ms' }}
              data-animate="header-desc"
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
                className={`bg-gray-200 rounded-lg p-6 flex gap-4 items-start transition-all duration-[1800ms] ease-out ${
                  visibleElements.has('features') 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 translate-x-${index % 2 === 0 ? '-6' : '6'}`
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="flex-shrink-0 text-red-400 mt-1">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
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
