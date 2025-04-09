import { useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className="bg-cream min-h-screen px-6 py-20 font-poppins">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-dark mb-6 text-center">
          Privacy <span className="text-teal">Policy</span>
        </h1>
        <p className="text-slate text-lg mb-8 text-center">
          Your privacy matters to us. Here's how we collect, use, and protect your data.
        </p>

        <div className="space-y-6 text-slate text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">1. Data Collection</h2>
            <p>
              We do not collect any personally identifiable information unless you voluntarily provide it
              (e.g. through signup or contact forms). Any data you enter stays within your browser or is used solely for app functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">2. Local Storage</h2>
            <p>
              Your preferences and session data may be stored locally in your browser using localStorage or sessionStorage.
              This ensures a smoother experience when you return to the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">3. Cookies</h2>
            <p>
              This application does not use third-party cookies or tracking scripts. We value a clean and transparent experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">4. Data Sharing</h2>
            <p>
              We do not share, sell, or trade your personal data with any third parties. Your information is secure and remains confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">5. Security</h2>
            <p>
              We follow industry best practices to protect your information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark mb-2">6. Changes to Policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be reflected on this page with the updated date.
            </p>
          </section>

          <p className="text-sm text-slate mt-8 text-right">
            Last updated: April 8, 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Privacy;
