import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import landingPage from '../assets/landing-page.svg';
import aiImg from '../assets/ai.svg';
import dashboardImg from '../assets/dashboard.svg';
import insightsImg from '../assets/insights.svg';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Section({ image, title, description, reverse = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className={`flex flex-col lg:flex-row ${
        reverse ? 'lg:flex-row-reverse' : ''
      } items-center gap-8 py-16`}
    >
      <motion.div
        className="w-full lg:w-1/2"
        variants={reverse ? fadeInLeft : fadeInRight}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <img src={image} alt={title} className="w-full max-w-md mx-auto" />
      </motion.div>
      <motion.div
        className="w-full lg:w-1/2 px-4"
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h3 className="text-2xl font-semibold text-dark mb-4">{title}</h3>
        <p className="text-slate text-lg">{description}</p>
      </motion.div>
    </section>
  );
}

function Landing() {
  return (
    <div className="bg-cream min-h-screen font-poppins">
      {/* Hero Section */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row items-center lg:justify-between">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-extrabold text-dark leading-tight">
            Welcome to <span className="text-red">Options AI</span>
          </h1>
          <p className="text-slate mt-6 text-lg">
            Your ultimate platform for options trading predictions powered by cutting-edge machine learning.
          </p>
          <Link
            to="signup"
            className="inline-block mt-6 px-6 py-3 bg-red text-white font-semibold rounded-xl shadow-md hover:bg-maroon transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div
          className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img src={landingPage} alt="Options Trading Illustration" className="max-w-full w-3/4 lg:w-full" />
        </motion.div>
      </div>

      {/* Features Section - Redesigned */}
      <div className="container mx-auto px-8 mt-20">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">Why Choose Options AI?</h2>

        <Section
          image={aiImg}
          title="AI-Powered Predictions"
          description="Leverage machine learning to make informed trading decisions and stay ahead of the market."
        />
        <Section
          image={dashboardImg}
          title="Intuitive & Interactive Dashboard"
          description="Our dashboard is designed to keep things simple and actionable — no clutter, just insights."
          reverse
        />
        <Section
          image={insightsImg}
          title="In-Depth Market Insights"
          description="Understand options trends, price forecasts, and movements with our comprehensive analytics."
        />
      </div>
    </div>
  );
}

export default Landing;
