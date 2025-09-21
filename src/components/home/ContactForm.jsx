import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { siteData } from '../../data/siteData';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
            }, 150);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -30px 0px' 
      }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your inquiry! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Title - Slide from Left */}
        <div 
          className={`text-center mb-12 transition-all duration-[1800ms] ease-out ${
            visibleElements.has('contact-title') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-20'
          }`}
          data-animate="contact-title"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-[1600ms] ease-out ${
              visibleElements.has('contact-title') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Ready to start your learning journey? Contact us today and let us help you achieve your academic goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form - Slide from Left */}
          <div 
            className={`card transition-all duration-[1800ms] ease-out ${
              visibleElements.has('form-section') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-24'
            }`}
            data-animate="form-section"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                  >
                    <option value="">Select a course</option>
                    {siteData.popularCourses?.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your goals and how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="loading-spinner w-5 h-5 mr-2" style={{borderWidth: '2px'}}></div>
                ) : (
                  <Send size={20} className="mr-2" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Contact Information - Slide from Right */}
          <div 
            className={`space-y-6 transition-all duration-[1800ms] ease-out ${
              visibleElements.has('info-section') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-24'
            }`}
            data-animate="info-section"
          >
            <div className="card">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {/* Address - Slide from Right with delay */}
                <div 
                  className={`flex items-start space-x-4 transition-all duration-[1400ms] ease-out ${
                    visibleElements.has('info-section') 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-16'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">{siteData.contact.address}</p>
                  </div>
                </div>
                
                {/* Phone - Slide from Right with more delay */}
                <div 
                  className={`flex items-start space-x-4 transition-all duration-[1400ms] ease-out ${
                    visibleElements.has('info-section') 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-16'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">{siteData.contact.phone}</p>
                  </div>
                </div>
                
                {/* Email - Slide from Right with most delay */}
                <div 
                  className={`flex items-start space-x-4 transition-all duration-[1400ms] ease-out ${
                    visibleElements.has('info-section') 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-16'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">{siteData.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Office Hours - Slide from Right */}
            <div 
              className={`card bg-gradient-primary text-white transition-all duration-[1600ms] ease-out ${
                visibleElements.has('info-section') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
