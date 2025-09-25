import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react';
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
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom">
         <div className="flex justify-between items-center gap-6 text-sm md:text-base">
  {/* Email (Left) */}
  <a
    href={`mailto:${siteData.contact.email}`}
    className="flex items-center gap-2 hover:underline"
  >
    <Mail size={16} />
    <span>{siteData.contact.email}</span>
  </a>

  {/* Phone Calls (Right) */}
  <div className="flex items-center gap-4">
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
      <span>{siteData.contact.phone2}</span>
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
      <span>{siteData.contact.phone}</span>
    </a>
  </div>
</div>

        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-2 md:py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-3 xl:hidden">
            <button
              className="xl:hidden p-3 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 mobile-menu-overlay">
          <div className="bg-white w-64 h-full shadow-xl">
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/logo.jpeg"
                    alt="Voiture Coaching Institute"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{display: 'none'}}
                  >
                    V
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2 mb-8">
                {siteData.navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between py-4 px-4 rounded-lg transition-all duration-300 ${
                      isActivePage(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={toggleMenu}
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        isActivePage(item.path) ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Social Media Links */}
              <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={20} className="hover:opacity-80 transition-opacity" />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={20} className="hover:opacity-80 transition-opacity" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} className="hover:opacity-80 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
