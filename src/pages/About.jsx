import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, BookOpen, Target, TrendingUp, Heart } from 'lucide-react';
import { siteData } from '../data/siteData';

const About = () => {
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
    <div className="overflow-hidden">
      {/* Hero Section - Title from Left, Description from Right */}
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center px-4">
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-all duration-[1800ms] ease-out ${
              visibleElements.has('hero') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
            data-animate="hero"
          >
            About {siteData.siteName}
          </h1>
          <p 
            className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-[1600ms] ease-out ${
              visibleElements.has('hero') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Empowering students since 2010 with quality education, expert guidance, and unwavering support in their academic journey.
          </p>
        </div>
      </section>

      {/* Main About Content - Story from Left, Image from Right */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Story Content - Slide from Left */}
            <div 
              className={`order-2 lg:order-1 transition-all duration-[1800ms] ease-out ${
                visibleElements.has('story') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-24'
              }`}
              data-animate="story"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>{siteData.about.description}</p>
                <p>
                  With over 15 years of experience in the education sector, we have continuously evolved our teaching methodologies to meet the changing needs of students and the competitive landscape.
                </p>
                <p>
                  Our dedicated team of experienced educators, state-of-the-art facilities, and personalized approach to learning have helped thousands of students achieve their dreams and build successful careers.
                </p>
              </div>
            </div>
            
            {/* Image - Slide from Right */}
            <div 
              className={`order-1 lg:order-2 transition-all duration-[2000ms] ease-out ${
                visibleElements.has('story-image') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-28'
              }`}
              data-animate="story-image"
            >
              <img
                src="/aboutus.jpg"
                alt="Our institute"
                className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg md:rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Mission from Left, Vision from Right */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {/* Mission - Slide from Left */}
            <div 
              className={`bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-md text-center transition-all duration-[1800ms] ease-out ${
                visibleElements.has('mission-card') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-20'
              }`}
              data-animate="mission-card"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Target className="text-white" size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {siteData.about.mission}
              </p>
            </div>
            
            {/* Vision - Slide from Right */}
            <div 
              className={`bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-md text-center transition-all duration-[1800ms] ease-out ${
                visibleElements.has('vision-card') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
              data-animate="vision-card"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Heart className="text-white" size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {siteData.about.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Alternating Left/Right */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12 transition-all duration-[1600ms] ease-out ${
              visibleElements.has('stats-title') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-16'
            }`}
            data-animate="stats-title"
          >
            Our <span className="text-gradient">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {siteData.about.stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-3 md:p-4 transition-all duration-[1400ms] ease-out ${
                  visibleElements.has('stats-grid') 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-16' : 'translate-x-16'}`
                }`}
                data-animate="stats-grid"
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-xs md:text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition - Alternating Left/Right */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12 transition-all duration-[1600ms] ease-out ${
              visibleElements.has('awards-title') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-16'
            }`}
            data-animate="awards-title"
          >
            Awards & <span className="text-gradient">Recognition</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {siteData.about.achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 md:space-x-4 bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow-md transition-all duration-[1600ms] ease-out ${
                  visibleElements.has('awards-grid') 
                    ? 'translate-x-0 opacity-100' 
                    : `${index % 2 === 0 ? '-translate-x-24' : 'translate-x-24'} opacity-0`
                }`}
                data-animate="awards-grid"
                style={{ transitionDelay: `${200 + index * 250}ms` }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="text-white" size={16} />
                </div>
                <span className="text-gray-800 font-semibold text-sm md:text-base leading-tight">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections - Alternating Left/Right */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12 transition-all duration-[1600ms] ease-out ${
              visibleElements.has('additional-title') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-16'
            }`}
            data-animate="additional-title"
          >
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {siteData.about.additionalSections.map((section, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl shadow-lg text-center transition-all duration-[1800ms] ease-out ${
                  visibleElements.has('additional-grid') 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${
                        index === 0 ? '-translate-x-20' : 
                        index === 1 ? 'translate-x-0 -translate-y-16' : 
                        'translate-x-20'
                      }`
                }`}
                data-animate="additional-grid"
                style={{ transitionDelay: `${200 + index * 300}ms` }}
              >
                <div className="text-4xl mb-4">
                  {index === 0 && '👨‍🏫'}
                  {index === 1 && '📚'}
                  {index === 2 && '🎯'}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
