import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, User } from 'lucide-react';
import { siteData } from '../data/siteData';
import PopularCourses from '../components/home/PopularCourses';
import OurPlacements from '../components/home/OurPlacements';
import StatsSection from '../components/home/StatsSection';

const About = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleElements((prev) => new Set([...prev, entry.target.dataset.animate]));
            }, 150);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      },
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Add fallback in case abouthero doesn't exist
  const { abouthero } = siteData;

  if (!abouthero) {
    return (
      <div className="overflow-hidden">
        <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              About {siteData.siteName}
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Empowering students since 2022 with quality education, expert guidance, and unwavering support in their academic journey.
            </p>
            
            {/* Simple Authorized License Partner Section */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                <p className="text-white font-medium text-base mb-3">Authorized License Partner</p>
                <img
                  src="/images/client/image.png"
                  alt="Licensed Partner Logo"
                  className="h-20 md:h-24 w-auto mx-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="py-16 text-center">
          <p className="text-gray-600">About content is being updated. Please check back soon.</p>
        </div>
        <PopularCourses />
        <OurPlacements />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1
            data-animate="hero"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-all duration-[800ms] ease-out ${
              visibleElements.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            About {siteData.siteName}
          </h1>
          <p
            data-animate="heroDesc"
            style={{ transitionDelay: '200ms' }}
            className={`max-w-3xl mx-auto text-lg md:text-xl leading-relaxed transition-all duration-[700ms] ease-out ${
              visibleElements.has('heroDesc') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            Empowering students since 2020 with quality education, expert guidance, and unwavering support in their career journey.
          </p>

          {/* Simple Authorized License Partner Section */}
          <div
            data-animate="license"
            style={{ transitionDelay: '400ms' }}
            className={`mt-8 flex flex-col items-center justify-center transition-all duration-[900ms] ease-out ${
              visibleElements.has('license') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20 shadow-lg">
              <p className="text-white font-medium text-base mb-3">Authorized License Partner</p>
              <img
                src="/images/client/image.png"
                alt="Licensed Partner Logo"
                className="h-20 md:h-24 w-auto mx-auto filter brightness-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Content */}
            <div
              data-animate="story"
              className={`order-2 lg:order-1 transition-all duration-[800ms] ease-out ${
                visibleElements.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
              }`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{abouthero.heading}</h2>
              <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                {abouthero.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="mt-10 space-y-6">
                {abouthero.features.map((feature, idx) => {
                  const IconComponent = feature.icon === 'GraduationCap' ? GraduationCap : User;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-red-700 rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
                        <IconComponent className="text-white" size={32} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div
              data-animate="story-image"
              className={`order-1 lg:order-2 transition-all duration-[900ms] ease-out ${
                visibleElements.has('story-image') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-28'
              }`}
            >
              <img
                src="/aboutus.jpg"
                alt="About Us"
                className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
              <br />
              <img
                src="/aboutus2.jpg"
                alt="About Us"
                className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <StatsSection />
      <PopularCourses />
      <OurPlacements />
    </div>
  );
};

export default About;
