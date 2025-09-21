import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { siteData } from '../../data/siteData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // State to manage which sections are open on mobile
  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    courses: false,
    contact: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* About Section - Always visible */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
              <h3 className="text-xl font-bold">{siteData.siteName}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {siteData.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={siteData.contact.social.facebook}
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={siteData.contact.social.instagram}
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={siteData.contact.social.linkedin}
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            {/* Desktop: Always show, Mobile: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('quickLinks')}
                className="flex items-center justify-between w-full text-lg font-semibold py-2 hover:text-primary-400 transition-colors"
              >
                Quick Links
                {openSections.quickLinks ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openSections.quickLinks ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 pt-2">
                  {siteData.navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-gray-300 hover:text-primary-400 transition-colors block py-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Desktop version */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {siteData.navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            {/* Mobile: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('courses')}
                className="flex items-center justify-between w-full text-lg font-semibold py-2 hover:text-primary-400 transition-colors"
              >
                Popular Courses
                {openSections.courses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openSections.courses ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 pt-2">
                  {siteData.popularCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        to="/courses"
                        className="text-gray-300 hover:text-primary-400 transition-colors block py-1"
                      >
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Desktop version */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
              <ul className="space-y-2">
                {siteData.popularCourses.map((course) => (
                  <li key={course.id}>
                    <Link
                      to="/courses"
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {course.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {/* Mobile: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('contact')}
                className="flex items-center justify-between w-full text-lg font-semibold py-2 hover:text-primary-400 transition-colors"
              >
                Contact Info
                {openSections.contact ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openSections.contact ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3">
                    <Phone size={18} className="text-primary-400 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-gray-300">{siteData.contact.phone}</p>
                      {siteData.contact.phone2 && <p className="text-gray-300">{siteData.contact.phone2}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={18} className="text-primary-400 flex-shrink-0" />
                    <p className="text-gray-300">{siteData.contact.email}</p>
                  </div>
                  {siteData.contact.address.map((address, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop version */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary-400 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-gray-300">{siteData.contact.phone}</p>
                    {siteData.contact.phone2 && <p className="text-gray-300">{siteData.contact.phone2}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary-400 flex-shrink-0" />
                  <p className="text-gray-300">{siteData.contact.email}</p>
                </div>
                {siteData.contact.address.map((address, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">{address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} {siteData.siteName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-primary-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-primary-400 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
