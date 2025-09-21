import React, { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Users, 
  Clock, 
  Award 
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

  const iconMap = {
    GraduationCap: GraduationCap,
    Target: Target,
    BookOpen: BookOpen,
    Users: Users,
    Clock: Clock,
    Award: Award
  };

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Header Section - Title from Left, Description from Right */}
        <div 
          className="text-center mb-12"
          data-animate="header"
        >
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition-all duration-[1800ms] ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            Why Choose <span className="text-gradient">Voiture Coaching</span>
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-[1600ms] ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Discover what makes us different and why thousands of students trust us with their educational journey.
          </p>
        </div>
        
        {/* Features Grid - Alternating Left/Right Animation */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-animate="features"
        >
          {siteData.whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            
            return (
              <div
                key={item.id}
                className={`card text-center hover:scale-105 transition-all duration-[1800ms] ease-out ${
                  visibleElements.has('features') 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-24' : 'translate-x-24'}`
                }`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                {/* Icon Container */}
                <div 
                  className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-[1400ms] ease-out ${
                    visibleElements.has('features') 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                >
                  <IconComponent className="text-white" size={28} />
                </div>
                
                {/* Title */}
                <h3 
                  className={`text-xl font-semibold text-gray-800 mb-3 transition-all duration-[1200ms] ease-out ${
                    visibleElements.has('features') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${500 + index * 200}ms` }}
                >
                  {item.title}
                </h3>
                
                {/* Description */}
                <p 
                  className={`text-gray-600 leading-relaxed transition-all duration-[1200ms] ease-out ${
                    visibleElements.has('features') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
