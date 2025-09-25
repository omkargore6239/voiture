import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../../data/siteData';

const CourseCard = ({ course, index, isVisible }) => {
  // Simplified animation direction based on position
  const getAnimationDirection = (index) => {
    const row = Math.floor(index / 4); // Assuming 4 columns in xl screens
    const col = index % 4;
    
    // Alternating animation directions for variety
    if (row % 2 === 0) {
      return col === 0 ? 'left' : col === 1 ? 'up' : col === 2 ? 'right' : 'left';
    } else {
      return col === 0 ? 'right' : col === 1 ? 'up' : col === 2 ? 'left' : 'right';
    }
  };

  const direction = getAnimationDirection(index);
  
  const getTransformClass = (direction, isVisible) => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-16';
      case 'right':
        return 'opacity-0 translate-x-16';
      case 'up':
        return 'opacity-0 translate-y-12';
      default:
        return 'opacity-0 translate-y-12';
    }
  };

  return (
    <Link
      to="/courses"
      className={`block bg-white rounded-xl shadow-lg hover:shadow-xl group hover:scale-105 transition-all duration-1000 ease-out cursor-pointer ${getTransformClass(direction, isVisible)}`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      {/* Card Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={course.image}
          alt={course.name}
          className={`w-full h-48 object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
            isVisible 
              ? 'scale-100 opacity-100' 
              : 'scale-110 opacity-0'
          }`}
          style={{ transitionDelay: `${300 + index * 100}ms` }}
          onError={(e) => {
            // Fallback image if original fails to load
            e.target.src = `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg 
              className="w-6 h-6 text-primary-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Course Name Only */}
      <div className="p-6">
        <h3 
          className={`text-xl font-bold text-gray-800 text-center transition-all duration-800 ease-out group-hover:text-primary-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${400 + index * 100}ms` }}
        >
          {course.name}
        </h3>
        
        {/* Click indicator text */}
        <p 
          className={`text-sm text-primary-600 font-medium text-center mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isVisible 
              ? 'translate-y-0' 
              : 'translate-y-2'
          }`}
          style={{ transitionDelay: `${500 + index * 100}ms` }}
        >
          Click to explore courses →
        </p>
      </div>
    </Link>
  );
};

const PopularCourses = () => {
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
        threshold: 0.05, 
        rootMargin: '0px 0px -20px 0px' 
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

  // Display ALL courses from popularCourses array
  const coursesToDisplay = siteData.popularCourses;

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Header Section */}
        <div 
          className="text-center mb-12"
          data-animate="header"
        >
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition-all duration-1200 ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            Our Popular <span className="text-gradient">Courses</span>
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Discover our comprehensive range of courses designed to help you achieve your career goals.
          </p>
        </div>
        
        {/* Courses Grid - Clean layout with only name and image */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          data-animate="courses"
        >
          {coursesToDisplay.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              index={index}
              isVisible={visibleElements.has('courses')}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div 
          className={`text-center transition-all duration-1000 ease-out ${
            visibleElements.has('button') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          data-animate="button"
        >
          <Link 
            to="/courses" 
            className="btn-outline hover:scale-105 transition-all duration-300 inline-block px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white"
          >
            View All Course Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
