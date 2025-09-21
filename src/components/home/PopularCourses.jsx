import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { siteData } from '../../data/siteData';

const CourseCard = ({ course, index, isVisible }) => {
  // Determine animation direction based on position
  const getAnimationDirection = (index) => {
    const row = Math.floor(index / 3); // Assuming 3 columns in lg screens
    const col = index % 3;
    
    // First row: left, center (up), right
    // Second row: right, center (up), left
    if (row % 2 === 0) {
      return col === 0 ? 'left' : col === 1 ? 'up' : 'right';
    } else {
      return col === 0 ? 'right' : col === 1 ? 'up' : 'left';
    }
  };

  const direction = getAnimationDirection(index);
  
  const getTransformClass = (direction, isVisible) => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-24';
      case 'right':
        return 'opacity-0 translate-x-24';
      case 'up':
        return 'opacity-0 translate-y-16';
      default:
        return 'opacity-0 translate-y-16';
    }
  };

  return (
    <div 
      className={`card group hover:scale-105 transition-all duration-[1800ms] ease-out ${getTransformClass(direction, isVisible)}`}
      style={{ transitionDelay: `${300 + index * 250}ms` }}
    >
      {/* Card Image with Staggered Animation */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={course.image}
          alt={course.name}
          className={`w-full h-48 object-cover group-hover:scale-110 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'scale-100 opacity-100' 
              : 'scale-110 opacity-0'
          }`}
          style={{ transitionDelay: `${400 + index * 250}ms` }}
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
          }}
        />
        
        {/* Price Badge */}
        <div 
          className={`absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-[1000ms] ease-out ${
            isVisible 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-12'
          }`}
          style={{ transitionDelay: `${600 + index * 250}ms` }}
        >
          {course.price}
        </div>
      </div>
      
      {/* Course Content with Sequential Animation */}
      <div className="space-y-4">
        {/* Title */}
        <h3 
          className={`text-xl font-bold text-gray-800 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${500 + index * 250}ms` }}
        >
          {course.name}
        </h3>
        
        {/* Description */}
        <p 
          className={`text-gray-600 line-clamp-2 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${600 + index * 250}ms` }}
        >
          {course.description}
        </p>
        
        {/* Course Meta Info */}
        <div 
          className={`flex items-center justify-between text-sm text-gray-500 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${700 + index * 250}ms` }}
        >
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{course.students} students</span>
          </div>
        </div>
        
        {/* Features Tags */}
        <div 
          className={`flex flex-wrap gap-2 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${800 + index * 250}ms` }}
        >
          {course.features.slice(0, 2).map((feature, featureIndex) => (
            <span
              key={featureIndex}
              className={`px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full transition-all duration-[800ms] ease-out ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${850 + index * 250 + featureIndex * 100}ms` }}
            >
              {feature}
            </span>
          ))}
        </div>
        
        {/* Rating and Button */}
        <div 
          className={`flex items-center justify-between transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${900 + index * 250}ms` }}
        >
          {/* Star Rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`text-yellow-400 fill-current transition-all duration-[600ms] ease-out ${
                    isVisible 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${950 + index * 250 + i * 50}ms` }}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">(4.8)</span>
          </div>
          
          {/* Learn More Button */}
          <Link
            to="/courses"
            className={`btn-primary text-sm px-4 py-2 transition-all duration-[800ms] ease-out hover:scale-105 ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: `${1000 + index * 250}ms` }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
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

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Header Section */}
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
            Our Popular <span className="text-gradient">Courses</span>
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-[1600ms] ease-out ${
              visibleElements.has('header') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Discover our most sought-after courses designed to help you achieve your academic goals with expert guidance and comprehensive study materials.
          </p>
        </div>
        
        {/* Courses Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          data-animate="courses"
        >
          {siteData.popularCourses.map((course, index) => (
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
          className={`text-center transition-all duration-[1600ms] ease-out ${
            visibleElements.has('button') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          data-animate="button"
        >
          <Link 
            to="/courses" 
            className="btn-outline hover:scale-105 transition-all duration-300"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
