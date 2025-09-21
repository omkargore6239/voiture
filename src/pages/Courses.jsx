import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Award, CheckCircle, Briefcase, FileText } from 'lucide-react';
import { siteData } from '../data/siteData';

const CourseCard = ({ course, index, isVisible }) => {
  const navigate = useNavigate();

  // Safeguard against missing data
  const {
    image = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    name = 'Course Name',
    category = 'General',
    description = 'Description not available',
    duration = 'Duration TBD',
    students = '0',
    features = [],
    courseHighlights = [],
    rating = 4.8,
    price = '₹15,000',
    jobAssistance = '100%',
    certificate = 'Yes'
  } = course || {};

  const handleEnrollClick = () => {
    navigate('/contact');
  };

  // Determine animation direction - alternating wave pattern
  const getAnimationDirection = (index) => {
    return index % 2 === 0 ? 'left' : 'right';
  };

  const direction = getAnimationDirection(index);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-[1800ms] ease-out overflow-hidden group ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : `opacity-0 ${direction === 'left' ? '-translate-x-24' : 'translate-x-24'} scale-95`
      }`}
      style={{ transitionDelay: `${300 + index * 200}ms` }}
    >
      {/* Course Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        
        {/* Left Side - Course Image and Basic Info */}
        <div className="space-y-4 p-6">
          {/* Course Image */}
          <div 
            className={`relative overflow-hidden rounded-xl transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'scale-100 opacity-100' 
                : 'scale-110 opacity-0'
            }`}
            style={{ transitionDelay: `${400 + index * 200}ms` }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Course Title and Rating */}
          <div 
            className={`space-y-3 transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${500 + index * 200}ms` }}
          >
            <h3 className="text-xl font-bold text-gray-800 leading-tight">{name} -</h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
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
                    style={{ transitionDelay: `${700 + index * 200 + i * 50}ms` }}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{rating}</span>
            </div>
          </div>

          {/* Course Meta Info */}
          <div 
            className={`flex flex-col gap-3 text-sm transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${700 + index * 200}ms` }}
          >
            <div className="flex items-center gap-2 text-primary-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Duration: {duration}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-600">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">{jobAssistance} Job Assistance</span>
            </div>
            <div className="flex items-center gap-2 text-primary-600">
              <FileText className="w-4 h-4" />
              <span className="font-medium">Certificate: {certificate}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Course Highlights */}
        <div 
          className={`bg-gray-50 p-6 space-y-6 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${800 + index * 200}ms` }}
        >
          {/* Course Highlights Header */}
          <h4 className="text-lg font-bold text-gray-800">
            Course Highlights-
          </h4>

          {/* Highlights Grid - 2 columns as shown in image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {(courseHighlights && courseHighlights.length > 0 ? courseHighlights : features).map((highlight, hlIndex) => (
              <div 
                key={hlIndex}
                className={`flex items-start gap-3 transition-all duration-[800ms] ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2'
                }`}
                style={{ transitionDelay: `${900 + index * 200 + hlIndex * 30}ms` }}
              >
                {/* Star Icon matching the image */}
                <div className="w-4 h-4 flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="text-primary-600">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Get all courses from siteData
  const allCourses = siteData?.allCourses || [];
  
  // Get unique categories from courses
  const categories = ['All', ...new Set(allCourses.map(course => course.category).filter(Boolean))];

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = (course.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Original Colors */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-primary text-white">
        <div 
          className="container-custom text-center px-4"
          data-animate="hero"
        >
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-all duration-[1800ms] ease-out ${
              visibleElements.has('hero') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            Our Professional Courses
          </h1>
          <p 
            className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-[1600ms] ease-out ${
              visibleElements.has('hero') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Explore our comprehensive range of courses designed to help you excel in your academic journey and achieve your career goals.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 md:py-8 lg:py-12 bg-gray-50">
        <div className="container-custom px-4">
          <div 
            className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8"
            data-animate="filters"
          >
            {/* Search Bar */}
            <div 
              className={`w-full max-w-md mx-auto md:mx-0 transition-all duration-[1600ms] ease-out ${
                visibleElements.has('filters') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-16'
              }`}
            >
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm md:text-base shadow-sm"
              />
            </div>

            {/* Category Filters - Original Colors */}
            <div 
              className={`flex flex-wrap gap-2 items-center justify-center md:justify-start transition-all duration-[1600ms] ease-out ${
                visibleElements.has('filters') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-16'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
                  } ${
                    visibleElements.has('filters') 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div 
            className={`mb-6 md:mb-8 transition-all duration-[1400ms] ease-out ${
              visibleElements.has('results') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            data-animate="results"
          >
            <p className="text-gray-600 text-sm md:text-base">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length ? (
            <div 
              className="space-y-8"
              data-animate="courses"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard 
                  key={course.id || index} 
                  course={course} 
                  index={index}
                  isVisible={visibleElements.has('courses')}
                />
              ))}
            </div>
          ) : (
            <div 
              className={`text-center py-8 md:py-12 transition-all duration-[1600ms] ease-out ${
                visibleElements.has('no-results') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              data-animate="no-results"
            >
              <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500 text-sm md:text-base">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Original Colors */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <div 
            className="text-center mb-8 md:mb-12"
            data-animate="why-header"
          >
            <h2 
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 transition-all duration-[1800ms] ease-out ${
                visibleElements.has('why-header') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              Why Choose Our <span className="text-gradient">Courses</span>
            </h2>
            <p 
              className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-[1600ms] ease-out ${
                visibleElements.has('why-header') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Our courses are designed with industry best practices and delivered by expert faculty to ensure your success.
            </p>
          </div>
          
          {/* WhyChooseUs data from siteData */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            data-animate="why-features"
          >
            {(siteData?.whyChooseUs || []).slice(0, 6).map((feature, index) => {
              // Icon mapping for whyChooseUs
              const iconMap = {
                GraduationCap: Award,
                Target: Award,
                BookOpen: BookOpen,
                Users: Users,
                Clock: Clock,
                Award: Award
              };
              const IconComponent = iconMap[feature.icon] || Award;
              
              return (
                <div 
                  key={feature.id || index}
                  className={`text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-[1800ms] ease-out ${
                    visibleElements.has('why-features') 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : `opacity-0 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'} scale-95`
                  }`}
                  style={{ transitionDelay: `${200 + index * 200}ms` }}
                >
                  <div 
                    className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-[1400ms] ease-out ${
                      visibleElements.has('why-features') 
                        ? 'opacity-100 scale-100 rotate-0' 
                        : 'opacity-0 scale-75 rotate-180'
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 
                    className={`text-lg font-semibold text-gray-800 mb-2 transition-all duration-[1200ms] ease-out ${
                      visibleElements.has('why-features') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${500 + index * 200}ms` }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className={`text-gray-600 transition-all duration-[1200ms] ease-out ${
                      visibleElements.has('why-features') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
