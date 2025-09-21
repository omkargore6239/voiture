import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Target } from 'lucide-react';
import { siteData } from '../../data/siteData';

const AboutSection = () => {
  const icons = {
    Award: Award,
    Users: Users,
    BookOpen: BookOpen,
    Target: Target
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                About <span className="text-gradient">Voiture Coaching</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {siteData.about.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {siteData.about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                <p className="text-gray-600">{siteData.about.mission}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
                <p className="text-gray-600">{siteData.about.vision}</p>
              </div>
            </div>
            
            <Link to="/about" className="btn-primary inline-block">
              Learn More About Us
            </Link>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students in classroom"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
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
