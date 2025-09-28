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
      count: 15,
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
            setTimeout(() => animateCounter(15, 1000, 'experience'), 900);
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
      className="py-4 md:py-6 lg:py-5 xl:py-6 bg-gradient-to-r from-red-600 to-red-700"
      data-animate="stats"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`flex items-center gap-3 md:gap-4 p-3 md:p-4rounded-lg md:rounded-xl   transition-all duration-[800ms] ease-out ${
                  visibleElements.has('stats')
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon Container - Left side */}
                <div 
                  className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transition-all duration-[600ms] ease-out ${
                    visibleElements.has('stats')
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${100 + index * 150}ms` }}
                >
                  <IconComponent className="text-red-500" size={18} />
                </div>

                {/* Stats Content - Right side */}
                <div 
                  className={`flex-1 min-w-0 transition-all duration-[700ms] ease-out ${
                    visibleElements.has('stats')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 leading-tight">
                    {counters[stat.id].toLocaleString()}{stat.suffix}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium leading-tight truncate">
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
