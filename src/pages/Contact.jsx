import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contactIllustration from '../assets/contact.svg';

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen px-6 py-20 font-poppins">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold text-dark mb-4">
          Contact <span className="text-teal">Us</span>
        </h1>
        <p className="text-lg text-slate">
          Have questions, feedback, or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Illustration */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          className="hidden lg:block"
        >
          <img
            src={contactIllustration}
            alt="Contact Illustration"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>

        {/* Right - Form */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-dark font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-dark font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-dark font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Let us know how we can help you..."
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-svg text-white font-bold rounded-lg hover:bg-red transition duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
