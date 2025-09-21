import React from 'react';
import { Award, Users, BookOpen, Target, TrendingUp, Heart } from 'lucide-react';
import { siteData } from '../data/siteData';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            About {siteData.siteName}
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Empowering students since 2010 with quality education, expert guidance, and unwavering support in their academic journey.
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  {siteData.about.description}
                </p>
                <p>
                  With over 15 years of experience in the education sector, we have continuously evolved our teaching methodologies to meet the changing needs of students and the competitive landscape.
                </p>
                <p>
                  Our dedicated team of experienced educators, state-of-the-art facilities, and personalized approach to learning have helped thousands of students achieve their dreams and build successful careers.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/aboutus.jpg"
                alt="Our institute"
                className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg md:rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-md text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Target className="text-white" size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {siteData.about.mission}
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-md text-center">
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

      {/* Stats Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12">
            Our <span className="text-gradient">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {siteData.about.stats.map((stat, index) => (
              <div key={index} className="text-center p-3 md:p-4">
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

      {/* Awards & Recognition */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 lg:mb-12">
            Awards & <span className="text-gradient">Recognition</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {siteData.about.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 md:space-x-4 bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow-md">
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
    </div>
  );
};

export default About;
