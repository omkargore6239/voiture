import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, ChevronDown, Facebook, Instagram, Linkedin, Phone } from 'lucide-react';
import { siteData } from '../../data/siteData';

// Manually added social media links (replace with your actual profiles)
const socialLinks = {
  facebook: 'https://facebook.com/voiturecoaching',
  instagram: 'https://instagram.com/voiturecoaching',
  linkedin: 'https://linkedin.com/company/voiturecoaching'
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - Mobile responsive improvements only */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-6 text-xs sm:text-sm md:text-base">
            {/* Email (Left on desktop, full width on mobile) */}
            <a
              href={`mailto:${siteData.contact.email}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Mail size={16} />
              <span className="truncate">{siteData.contact.email}</span>
            </a>

            {/* Phone Calls (Right on desktop, full width on mobile) */}
            <div className="flex flex-col xs:flex-row items-center gap-2 xs:gap-4">
              {/* First Phone */}
              <a
                href={`tel:${siteData.contact.phone2.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.3 21 3 13.7 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.09.34.02.71-.24 1.01l-2.21 2.2z" />
                </svg>
                <span className="whitespace-nowrap">{siteData.contact.phone2}</span>
              </a>

              {/* Second Phone */}
              <a
                href={`tel:${siteData.contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.3 21 3 13.7 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.09.34.02.71-.24 1.01l-2.21 2.2z" />
                </svg>
                <span className="whitespace-nowrap">{siteData.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Desktop layout preserved */}
      <div className="container-custom py-2 md:py-3">
        <div className="flex justify-between items-center">
          {/* Logo - Same as original */}
          <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity duration-300">
            <img
              src="/images/logo.jpeg"
              alt="Voiture Coaching Institute"
              className="h-[72px] md:h-[50px] w-auto object-contain hover:scale-105 transition-transform duration-300 min-h-[72px] min-w-[72px]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div
              className="hidden md:inline-flex h-[100px] w-[100px] sm:h-[90px] sm:w-[90px] md:h-[100px] md:w-[100px] bg-gradient-to-br from-primary-500 to-secondary-600 rounded-r-none md:rounded-full flex items-center justify-center text-white font-bold text-3xl md:text-4xl shadow-lg"
              style={{display: 'none'}}
            >
              <span className="mt-1">V</span>
            </div>
          </Link>

          {/* Desktop Navigation - Unchanged */}
          <nav className="hidden xl:flex space-x-8 flex-1 justify-center">
            {siteData.navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link py-3 px-6 rounded-lg transition-all duration-300 font-medium text-lg ${
                  isActivePage(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button - Touch optimized */}
          <div className="flex items-center space-x-3 xl:hidden">
            <button
              className="xl:hidden p-3 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Enhanced for mobile */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="xl:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel - Improved responsive design */}
          <div className="xl:hidden fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/logo.jpeg"
                    alt="Voiture Coaching Institute"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                    style={{display: 'none'}}
                  >
                    V
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Menu</h2>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Links - Scrollable */}
              <nav className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
                <div className="space-y-2">
                  {siteData.navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center justify-between py-3 sm:py-4 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[48px] ${
                        isActivePage(item.path)
                          ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                      onClick={toggleMenu}
                    >
                      <span className="font-medium text-base sm:text-lg">{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-300 ${
                          isActivePage(item.path) ? 'rotate-180 text-primary-600' : 'text-gray-400'
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Contact Info & Social Media - Enhanced mobile section */}
              <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex flex-col space-y-2">
                    <a
                      href={`tel:${siteData.contact.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors touch-manipulation py-2"
                    >
                      <Phone size={18} />
                      <span className="text-sm sm:text-base">{siteData.contact.phone}</span>
                    </a>
                    <a
                      href={`tel:${siteData.contact.phone2.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors touch-manipulation py-2"
                    >
                      <Phone size={18} />
                      <span className="text-sm sm:text-base">{siteData.contact.phone2}</span>
                    </a>
                  </div>
                  
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors touch-manipulation py-2"
                  >
                    <Mail size={18} />
                    <span className="text-sm sm:text-base truncate">{siteData.contact.email}</span>
                  </a>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center gap-4 sm:gap-6 pt-4 border-t border-gray-200">
                  <a 
                    href={socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-full transition-all duration-300 touch-manipulation"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href={socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-full transition-all duration-300 touch-manipulation"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-full transition-all duration-300 touch-manipulation"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
  