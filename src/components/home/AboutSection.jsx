import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Target } from 'lucide-react';
import { siteData } from '../../data/siteData';

const AboutSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
            }, 100);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
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
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Slide from Left */}
          <div 
            className={`space-y-8 transition-all duration-[1500ms] ease-out ${
              visibleElements.has('left-content') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
            data-animate="left-content"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About <span className="text-gradient">Voiture Coaching</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {siteData.about.description}
              </p>
            </div>
            
            
            
            {/* Button - Slide from Left */}
            <div 
              className={`transition-all duration-[1200ms] ease-out ${
                visibleElements.has('left-content') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1100ms' }}
            >
              <Link to="/about" className="btn-primary inline-block">
                Learn More About Us
              </Link>
            </div>
          </div>
          
          {/* Right Image - Slide from Right */}
          <div 
            className={`relative transition-all duration-[1800ms] ease-out ${
              visibleElements.has('right-image') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-24'
            }`}
            data-animate="right-image"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students in classroom"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            
            {/* Award Card - Slide from Right */}
            <div 
              className={`absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl transition-all duration-[1600ms] ease-out ${
                visibleElements.has('right-image') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-16'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
