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

  // Only 5 specific courses as requested
  const featuredCourses = [
    { id: 'java-fullstack', name: 'Java Full Stack' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'plastic-trims', name: 'Plastic Trims Design' },
    { id: 'biw-product', name: 'BIW Product Design' },
    { id: 'cad-design', name: 'CAD Design' }
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 lg:py-6 xl:py-7 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10">
          
          {/* About Section - More space on large screens */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 space-y-3 sm:space-y-4 lg:space-y-3">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-sm xl:text-base">
                V
              </div>
              <h3 className="text-lg sm:text-xl lg:text-lg xl:text-xl font-bold">{siteData.siteName}</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed line-clamp-3 sm:line-clamp-none lg:line-clamp-4 xl:line-clamp-none">
              {siteData.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-3">
              <a 
                href={siteData.contact.social.facebook}
                className="p-2 sm:p-2.5 lg:p-2 xl:p-2.5 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors touch-manipulation"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={16} className="sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
              </a>
              <a 
                href={siteData.contact.social.instagram}
                className="p-2 sm:p-2.5 lg:p-2 xl:p-2.5 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors touch-manipulation"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} className="sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
              </a>
              <a 
                href={siteData.contact.social.linkedin}
                className="p-2 sm:p-2.5 lg:p-2 xl:p-2.5 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors touch-manipulation"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} className="sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Compact on large screens */}
          <div className="col-span-1 lg:col-span-1 xl:col-span-1">
            {/* Mobile & Tablet: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('quickLinks')}
                className="flex items-center justify-between w-full text-base sm:text-lg font-semibold py-2 sm:py-3 hover:text-primary-400 transition-colors touch-manipulation min-h-[44px]"
              >
                Quick Links
                {openSections.quickLinks ? 
                  <ChevronUp size={20} className="sm:w-5 sm:h-5" /> : 
                  <ChevronDown size={20} className="sm:w-5 sm:h-5" />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.quickLinks ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 sm:space-y-3 pt-2 pb-4">
                  {siteData.navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-gray-300 hover:text-primary-400 transition-colors block py-1 text-sm sm:text-base touch-manipulation"
                        onClick={() => setOpenSections(prev => ({...prev, quickLinks: false}))}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Desktop version - More compact */}
            <div className="hidden lg:block">
              <h3 className="text-sm xl:text-base font-semibold mb-2 xl:mb-3">Quick Links</h3>
              <ul className="space-y-1 xl:space-y-1.5">
                {siteData.navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-xs xl:text-sm hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured Courses - Compact on large screens */}
          <div className="col-span-1 lg:col-span-1 xl:col-span-1">
            {/* Mobile & Tablet: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('courses')}
                className="flex items-center justify-between w-full text-base sm:text-lg font-semibold py-2 sm:py-3 hover:text-primary-400 transition-colors touch-manipulation min-h-[44px]"
              >
                Featured Courses
                {openSections.courses ? 
                  <ChevronUp size={20} className="sm:w-5 sm:h-5" /> : 
                  <ChevronDown size={20} className="sm:w-5 sm:h-5" />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.courses ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 sm:space-y-3 pt-2 pb-4">
                  {featuredCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        to="/courses"
                        className="text-gray-300 hover:text-primary-400 transition-colors block py-1 text-sm sm:text-base touch-manipulation"
                        onClick={() => setOpenSections(prev => ({...prev, courses: false}))}
                      >
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Desktop version - More compact */}
            <div className="hidden lg:block">
              <h3 className="text-sm xl:text-base font-semibold mb-2 xl:mb-3">Featured Courses</h3>
              <ul className="space-y-1 xl:space-y-1.5">
                {featuredCourses.map((course) => (
                  <li key={course.id}>
                    <Link
                      to="/courses"
                      className="text-gray-300 hover:text-primary-400 transition-colors text-xs xl:text-sm hover:text-white block"
                    >
                      {course.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info - Optimized for large screens */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
            {/* Mobile & Tablet: Collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => toggleSection('contact')}
                className="flex items-center justify-between w-full text-base sm:text-lg font-semibold py-2 sm:py-3 hover:text-primary-400 transition-colors touch-manipulation min-h-[44px]"
              >
                Contact Info
                {openSections.contact ? 
                  <ChevronUp size={20} className="sm:w-5 sm:h-5" /> : 
                  <ChevronDown size={20} className="sm:w-5 sm:h-5" />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.contact ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-3 sm:space-y-4 pt-2 pb-4">
                  <div className="flex items-start space-x-3">
                    <Phone size={18} className="text-primary-400 flex-shrink-0 mt-1 sm:w-5 sm:h-5" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <a 
                        href={`tel:${siteData.contact.phone}`}
                        className="text-gray-300 hover:text-primary-400 transition-colors block text-sm sm:text-base touch-manipulation break-all"
                      >
                        {siteData.contact.phone}
                      </a>
                      {siteData.contact.phone2 && 
                        <a 
                          href={`tel:${siteData.contact.phone2}`}
                          className="text-gray-300 hover:text-primary-400 transition-colors block text-sm sm:text-base touch-manipulation break-all"
                        >
                          {siteData.contact.phone2}
                        </a>
                      }
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail size={18} className="text-primary-400 flex-shrink-0 mt-1 sm:w-5 sm:h-5" />
                    <a 
                      href={`mailto:${siteData.contact.email}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base touch-manipulation break-all min-w-0 flex-1"
                    >
                      {siteData.contact.email}
                    </a>
                  </div>
                  {siteData.contact.address.map((address, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed min-w-0 flex-1">
                        {address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop version - Compact and efficient */}
            <div className="hidden lg:block">
              <h3 className="text-sm xl:text-base font-semibold mb-2 xl:mb-3">Contact Info</h3>
              <div className="space-y-1.5 xl:space-y-2">
                <div className="flex items-start space-x-2 xl:space-x-3">
                  <Phone size={14} className="text-primary-400 flex-shrink-0 mt-0.5 xl:w-4 xl:h-4" />
                  <div className="space-y-0.5 min-w-0">
                    <a 
                      href={`tel:${siteData.contact.phone}`}
                      className="text-gray-300 hover:text-primary-400 hover:text-white transition-colors block text-xs xl:text-sm"
                    >
                      {siteData.contact.phone}
                    </a>
                    {siteData.contact.phone2 && 
                      <a 
                        href={`tel:${siteData.contact.phone2}`}
                        className="text-gray-300 hover:text-primary-400 hover:text-white transition-colors block text-xs xl:text-sm"
                      >
                        {siteData.contact.phone2}
                      </a>
                    }
                  </div>
                </div>
                <div className="flex items-start space-x-2 xl:space-x-3">
                  <Mail size={14} className="text-primary-400 flex-shrink-0 mt-0.5 xl:w-4 xl:h-4" />
                  <a 
                    href={`mailto:${siteData.contact.email}`}
                    className="text-gray-300 hover:text-primary-400 hover:text-white transition-colors text-xs xl:text-sm min-w-0 break-all"
                  >
                    {siteData.contact.email}
                  </a>
                </div>
                {siteData.contact.address.map((address, index) => (
                  <div key={index} className="flex items-start space-x-2 xl:space-x-3">
                    <MapPin size={14} className="text-primary-400 mt-0.5 flex-shrink-0 xl:w-4 xl:h-4" />
                    <p className="text-gray-300 text-xs xl:text-xs leading-relaxed">
                      {address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Ultra compact on large screens */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 lg:mt-4 xl:mt-5 pt-4 sm:pt-6 lg:pt-3 xl:pt-4">
          <div className="flex flex-col space-y-2 sm:space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0 lg:space-y-0 text-center md:text-left">
            <p className="text-gray-300 text-xs ali sm:text-sm lg:text-xs xl:text-sm">
              © {currentYear} {siteData.siteName}. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
