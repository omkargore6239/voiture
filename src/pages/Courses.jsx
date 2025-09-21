import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Award, CheckCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

const CourseCard = ({ course }) => {
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
    rating
  } = course || {};

  const handleEnrollClick = () => {
    navigate('/contact');
  };

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173')}
        />
        <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-secondary-600 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base">{description}</p>

        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{students} students</span>
          </div>
        </div>

        <div className="mb-3 md:mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
            {courseHighlights.length ? 'Course Highlights:' : 'Subjects Covered:'}
          </h4>
          {courseHighlights.length ? (
            <ul className="space-y-1">
              {courseHighlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="text-xs md:text-sm flex items-start text-gray-600">
                  <span className="text-primary-500 mr-2 flex-shrink-0 mt-1">&bull;</span>
                  <span className="line-clamp-2">{highlight}</span>
                </li>
              ))}
              {courseHighlights.length > 3 && (
                <li className="text-xs md:text-sm text-primary-600 font-medium">
                  +{courseHighlights.length - 3} more topics...
                </li>
              )}
            </ul>
          ) : (
            <p className="text-xs md:text-sm italic text-gray-500">No highlights listed.</p>
          )}
        </div>

        <div className="mb-4 md:mb-6">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">Key Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-yellow-400 fill-current"
              />
            ))}
            <span className="ml-2 text-xs md:text-sm text-gray-600">
              ({(Number(rating) || 4.8).toFixed(1)})
            </span>
          </div>
          <button
            onClick={handleEnrollClick}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-2 px-3 md:px-4 rounded-lg transition-all duration-300 text-xs md:text-sm"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const allCourses = siteData?.allCourses || [];
  const categories = ['All', ...new Set(allCourses.map(course => course.category).filter(Boolean))];

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-primary text-white">
        <div className="container-custom text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Our Courses
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of courses designed to help you excel in your academic journey and achieve your career goals.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 md:py-8 lg:py-12 bg-gray-50">
        <div className="container-custom px-4">
          <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Search Bar */}
            <div className="w-full max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 md:mb-8">
            <p className="text-gray-600 text-sm md:text-base">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.id || Math.random()} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500 text-sm md:text-base">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Why Choose Our <span className="text-gradient">Courses</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Our courses are designed with industry best practices and delivered by expert faculty to ensure your success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award className="text-white" size={20} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Expert Faculty</h3>
              <p className="text-gray-600 text-sm md:text-base">Learn from experienced teachers and industry experts</p>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Updated Curriculum</h3>
              <p className="text-gray-600 text-sm md:text-base">Latest syllabus and exam patterns covered</p>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Users className="text-white" size={20} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Small Batches</h3>
              <p className="text-gray-600 text-sm md:text-base">Personalized attention with limited students per batch</p>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="text-white" size={20} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-gray-600 text-sm md:text-base">95% success rate with thousands of toppers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
