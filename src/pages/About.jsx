import { useEffect } from "react";
import { motion } from "framer-motion";
import groupPhoto from "../assets/group-photo.png";

// Animation Variants
const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUpStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen py-12 px-6 font-poppins">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          variants={fadeDown}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-5xl font-extrabold text-dark mb-6">
            About <span className="text-red">Options AI</span>
          </h1>

          <p className="text-slate text-lg max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-teal">Options AI</span>, your trusted platform for options trading predictions. Our mission is to empower traders with cutting-edge machine learning insights to make smarter, more informed decisions.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="w-24 h-1 bg-teal mx-auto my-12 rounded-full" />

        {/* Image */}
        <motion.div
          variants={zoomIn}
          initial="hidden"
          animate="visible"
          className="mt-10 flex justify-center"
        >
          <img
            src={groupPhoto}
            alt="Our Team"
            className="rounded-2xl shadow-lg object-cover"
            width={300}
          />
        </motion.div>

        {/* Info Cards */}
        <motion.div
          variants={fadeUpStagger}
          initial="hidden"
          animate="visible"
          className="mt-16 grid md:grid-cols-3 gap-12 text-left text-slate"
        >
          <motion.div variants={fadeItem}>
            <h3 className="text-2xl font-bold text-dark mb-3">Our Vision</h3>
            <p>
              We aim to revolutionize trading by making advanced AI predictions accessible to everyone — from beginners to pros.
            </p>
          </motion.div>

          <motion.div variants={fadeItem}>
            <h3 className="text-2xl font-bold text-dark mb-3">Our Technology</h3>
            <p>
              Built on state-of-the-art machine learning models, our platform delivers actionable insights on market trends and options strategies.
            </p>
          </motion.div>

          <motion.div variants={fadeItem}>
            <h3 className="text-2xl font-bold text-dark mb-3">Our Commitment</h3>
            <p>
              We're committed to helping traders reach their financial goals with confidence, transparency, and continuous innovation.
            </p>
          </motion.div>
        </motion.div>

        <p className="mt-16 py-3 text-lg text-slate">Made With ❤️</p>
      </div>
    </div>
  );
}

export default About;
