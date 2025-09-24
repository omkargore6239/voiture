import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularCourses from '../components/home/PopularCourses';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import ContactForm from '../components/home/ContactForm';
import OurPlacements from '../components/home/OurPlacements';
import StatsSection from '../components/home/StatsSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PopularCourses />
      <AboutSection />
      <WhyChooseUs />
        <StatsSection />
      <OurPlacements/>
      <Testimonials />
      <ContactForm />
    </div>
  );
};

export default Home;
