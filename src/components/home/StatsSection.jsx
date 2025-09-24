import React, { useEffect, useRef, useState } from 'react';
import { Users, Handshake, Building, UserCheck } from 'lucide-react';

const StatsSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [counters, setCounters] = useState({
    students: 0,
    placements: 0,
    experience: 0,
    faculty: 0
  });
  const observerRef = useRef(null);
  const hasAnimated = useRef(false);

  const statsData = [
    {
      id: 'students',
      icon: Users,
      count: 1000,
      suffix: '+',
      label: 'Happy Students',
      color: 'text-white'
    },
    {
      id: 'placements',
      icon: Handshake,
      count: 400,
      suffix: '+',
      label: 'Placements',
      color: 'text-white'
    },
    {
      id: 'experience',
      icon: Building,
      count: 7,
      suffix: '+',
      label: 'Experience',
      color: 'text-white'
    },
    {
      id: 'faculty',
      icon: UserCheck,
      count: 7,
      suffix: '+',
      label: 'Faculty',
      color: 'text-white'
    }
  ];

  // Counter animation function
  const animateCounter = (target, duration, id) => {
    const start = 0;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      
      setCounters(prev => ({ ...prev, [id]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setVisibleElements(prev => new Set([...prev, 'stats']));
            hasAnimated.current = true;
            
            // Start counter animations with delays
            setTimeout(() => animateCounter(1000, 2000, 'students'), 300);
            setTimeout(() => animateCounter(400, 1800, 'placements'), 600);
            setTimeout(() => animateCounter(7, 1000, 'experience'), 900);
            setTimeout(() => animateCounter(7, 1000, 'faculty'), 1200);
          }
        });
      },
      { 
        threshold: 0.3,
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
    <section 
      className="py-6 md:py-10 lg:py-8 xl:py-10 bg-gradient-to-r from-red-600 to-red-700"
      data-animate="stats"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`text-center transition-all duration-[800ms] ease-out ${
                  visibleElements.has('stats')
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Icon Container - Smaller on mobile */}
                <div 
                  className={`w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg transition-all duration-[600ms] ease-out ${
                    visibleElements.has('stats')
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${100 + index * 200}ms` }}
                >
                  <IconComponent className="text-red-500" size={20} />
                </div>

                {/* Counter - Responsive sizing */}
                <div 
                  className={`transition-all duration-[700ms] ease-out ${
                    visibleElements.has('stats')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + index * 200}ms` }}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                    {counters[stat.id].toLocaleString()}{stat.suffix}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium opacity-90 leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
