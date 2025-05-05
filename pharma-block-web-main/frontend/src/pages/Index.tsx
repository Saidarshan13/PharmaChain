
import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';

const Index: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
    </div>
  );
};

export default Index;


