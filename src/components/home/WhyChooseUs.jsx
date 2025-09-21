import React from 'react';
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Users, 
  Clock, 
  Award 
} from 'lucide-react';
import { siteData } from '../../data/siteData';

const WhyChooseUs = () => {
  const iconMap = {
    GraduationCap: GraduationCap,
    Target: Target,
    BookOpen: BookOpen,
    Users: Users,
    Clock: Clock,
    Award: Award
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-gradient">Voiture Coaching</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes us different and why thousands of students trust us with their educational journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.whyChooseUs.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className="card text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
