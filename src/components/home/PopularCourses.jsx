import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { siteData } from '../../data/siteData';

const CourseCard = ({ course }) => {
  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
          }}
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {course.price}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-1" />
          <span>{course.students} students</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {course.features.slice(0, 2).map((feature, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full"
          >
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-current"
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.8)</span>
        </div>
        <Link
          to="/courses"
          className="btn-primary text-sm px-4 py-2"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Popular <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after courses designed to help you achieve your academic goals with expert guidance and comprehensive study materials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {siteData.popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/courses" className="btn-outline">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
