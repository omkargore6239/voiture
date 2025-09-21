import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { siteData } from '../data/siteData';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    branch: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        branch: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);

      // Hide success toast after 4 seconds
      setTimeout(() => setShowSuccess(false), 4000);
    }, 2000);
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Send us a Message</h3>
      
      {showSuccess && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <span className="text-sm md:text-base">Thank you for your message! We'll get back to you within 24 hours.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
              placeholder="+91 9876543210"
            />
          </div>
          
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Branch *
            </label>
            <select
              id="branch"
              name="branch"
              required
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
            >
              <option value="">Select a branch</option>
              <option value="ravet">Ravet Branch</option>
              <option value="moshi">Moshi Branch</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            Interested Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
          >
            <option value="">Select a course</option>
            {siteData.allCourses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all text-sm md:text-base"
            placeholder="Brief subject of your inquiry"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none text-sm md:text-base"
            placeholder="Tell us about your goals and how we can help you..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-sm md:text-base"
        >
          {isSubmitting ? (
            <div className="animate-spin w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          ) : (
            <Send size={18} className="mr-2" />
          )}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-primary text-white">
        <div className="container-custom text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Get in touch with us for admissions, course information, or any questions. We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Information */}
            <div className="space-y-4 md:space-y-6">
              {/* Branch Locations */}
              <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Our Branches</h3>
                
                {/* Ravet Branch */}
                <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border-l-4 border-primary-600">
                  <div className="flex items-center mb-3">
                    <Building2 className="text-primary-600 mr-2" size={20} />
                    <h4 className="font-bold text-gray-800 text-lg">Ravet Branch</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={16} />
                      <p className="text-gray-700 text-sm md:text-base">{siteData.contact.address[0]}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-primary-600 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-gray-700 font-medium text-sm md:text-base">{siteData.contact.phone}</p>
                        <p className="text-xs text-gray-500">Primary Contact</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moshi Branch */}
                <div className="p-4 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg border-l-4 border-secondary-600">
                  <div className="flex items-center mb-3">
                    <Building2 className="text-secondary-600 mr-2" size={20} />
                    <h4 className="font-bold text-gray-800 text-lg">Moshi Branch</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-secondary-600 mt-1 flex-shrink-0" size={16} />
                      <p className="text-gray-700 text-sm md:text-base">{siteData.contact.address[1]}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-secondary-600 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-gray-700 font-medium text-sm md:text-base">{siteData.contact.phone2}</p>
                        <p className="text-xs text-gray-500">Secondary Contact</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primary-600 flex-shrink-0" size={18} />
                    <div>
                      <h5 className="font-semibold text-gray-800 text-sm md:text-base">Email (Both Branches)</h5>
                      <p className="text-gray-600 text-xs md:text-sm">{siteData.contact.email}</p>
                      <p className="text-xs text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Office Hours */}
              <div className="bg-gradient-primary text-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl">
                <div className="flex items-center mb-3 md:mb-4">
                  <Clock className="mr-2 md:mr-3" size={20} />
                  <h3 className="text-lg md:text-xl font-semibold">Office Hours (Both Branches)</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  <div className="pt-2 md:pt-3 border-t border-white border-opacity-20">
                    <p className="text-xs md:text-sm opacity-90">
                      <MessageCircle className="inline mr-1" size={14} />
                      Emergency contact available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Quick Contact Cards */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Choose Your Nearest Branch</h2>
            <p className="text-gray-600">Visit us at any of our two convenient locations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Ravet Branch Card */}
            <div className="bg-white p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 flex flex-col justify-between rounded-lg shadow-lg border-t-4 border-primary-600">
              <div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Building2 className="text-white" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Ravet Branch</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed">{siteData.contact.address[0]}</p>
                <div className="space-y-1 mb-3 md:mb-4">
                  <p className="text-primary-600 font-semibold text-sm md:text-base">{siteData.contact.phone}</p>
                  <p className="text-gray-500 text-xs">Primary Branch</p>
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href={`tel:${siteData.contact.phone}`} 
                  className="block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
                >
                  Call Ravet Branch
                </a>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                  Get Directions
                </button>
              </div>
            </div>

            {/* Moshi Branch Card */}
            <div className="bg-white p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 flex flex-col justify-between rounded-lg shadow-lg border-t-4 border-secondary-600">
              <div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Building2 className="text-white" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Moshi Branch</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed">{siteData.contact.address[1]}</p>
                <div className="space-y-1 mb-3 md:mb-4">
                  <p className="text-secondary-600 font-semibold text-sm md:text-base">{siteData.contact.phone2}</p>
                  <p className="text-gray-500 text-xs">Secondary Branch</p>
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href={`tel:${siteData.contact.phone2}`} 
                  className="block bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
                >
                  Call Moshi Branch
                </a>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Common Email Card */}
          <div className="max-w-md mx-auto mt-6 md:mt-8">
            <div className="bg-white p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 rounded-lg shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Mail className="text-white" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Email Both Branches</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{siteData.contact.email}</p>
              <a 
                href={`mailto:${siteData.contact.email}`} 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
