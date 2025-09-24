import React, { useEffect, useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { siteData } from '../../data/siteData';

const branches = [
  {
    label: 'Ravet Branch',
    address: siteData.contact.address[0],
    phone: siteData.contact.phone,
    brandColor: 'border-red-600 ',
    icon: <MapPin className="text-red-600" size={20} />,
    phoneLabel: 'Primary Contact'
  },
  {
    label: 'Moshi Branch',
    address: siteData.contact.address[1],
    phone: siteData.contact.phone2,
    brandColor: 'border-red-600 ',
    icon: <MapPin className="text-red-600" size={20} />,
    phoneLabel: 'Secondary Contact'
  }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    course: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current.observe(el));
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        course: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1300);
  };

  return (
    <section className="bg-gray-50 p-4 md:p-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SECTION: FORM */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-600 font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                />
              </div>
              <div>
                <label htmlFor="branch" className="block text-sm text-gray-600 font-medium mb-1">Preferred Branch *</label>
                <select
                  name="branch"
                  id="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                >
                  <option value="">Select a branch</option>
                  <option value="Ravet">Ravet Branch</option>
                  <option value="Moshi">Moshi Branch</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div>
                <label htmlFor="course" className="block text-sm text-gray-600 font-medium mb-1">Interested Course</label>
                <select
                  name="course"
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                >
                  <option value="">Select a course</option>
                  {siteData.popularCourses?.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-gray-600 font-medium mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject of your inquiry"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-600 font-medium mb-1">Message *</label>
              <textarea
                name="message"
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 text-gray-800 resize-none"
                placeholder="Tell us about your goals and how we can help you..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3 text-base font-semibold rounded-md transition-all bg-gradient-to-r from-red-600 to-red-600 text-white hover:from-red-600 hover:to-red-600"
            >
              {isSubmitting ? (
                <svg className="animate-spin w-5 h-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" opacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="4" fill="none" />
                </svg>
              ) : (
                <Send size={20} className="mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {showSuccess && (
              <div className="flex items-center justify-center mt-4">
                <div className="animate-success-pop bg-green-100 text-green-700 font-semibold px-3 py-2 rounded flex items-center transition">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Message sent successfully!
                </div>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT SECTION: BRANCHES and HOURS */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Branches</h3>
          {/* Branch Cards */}
          {branches.map((branch, idx) => (
            <div key={idx} className={`rounded-lg shadow-sm p-5 mb-2 border-l-4 ${branch.brandColor}`}>
              <div className="flex gap-3 items-center mb-1">
                {branch.icon}
                <span className="font-bold text-lg text-gray-800">{branch.label}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-1">
                <MapPin size={18} className="mr-2 text-gray-400" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center mt-2">
                <Phone size={18} className="mr-2 text-gray-400" />
                <span className="font-medium">{branch.phone}</span>
                <span className="ml-2 text-xs text-gray-500">{branch.phoneLabel}</span>
              </div>
            </div>
          ))}
          {/* Email Car d */}
          <div className="rounded-lg shadow-sm p-5 mb-2 border-l-4 border-red-600 bg-white-50">
            <div className="flex items-center mb-1">
              <Mail size={18} className="mr-2 text-red-600" />
              <span className="font-semibold text-gray-800">Email (Both Branches)</span>
            </div>
            <div className="text-gray-700">{siteData.contact.email}</div>
            <span className="ml-7 text-xs text-gray-500">We'll respond within 24 hours</span>
          </div>
          {/* Office Hours Card */}
          <div className="rounded-lg shadow-sm p-4 mt-2 border-l-4 border-red-600 bg-gradient-to-r from-red-600/90 to-red-600/90 text-white">
            <div className="flex items-center mb-2">
              <svg width={22} height={22} className="text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span className="font-bold text-lg">Office Hours (Both Branches)</span>
            </div>
            <div className="flex justify-between py-1"><span>Monday - Friday:</span><span>9:00 AM - 6:00 PM</span></div>
            <div className="flex justify-between py-1"><span>Saturday:</span><span>9:00 AM - 4:00 PM</span></div>
            <div className="flex justify-between py-1"><span>Sunday:</span><span>Closed</span></div>
            <div className="mt-2 text-xs font-semibold">Emergency contact available 24/7</div>
          </div>
        </div>
      </div>
      {/* Success Animation CSS */}
      <style>{`
        .animate-success-pop {
          animation: success-pop 0.5s cubic-bezier(.2,2,.5,.9);
        }
        @keyframes success-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
