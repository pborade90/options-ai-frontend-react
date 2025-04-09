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

function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className="bg-cream min-h-screen px-6 py-20 font-poppins">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark">
            Terms & <span className="text-teal">Conditions</span>
          </h1>
          <p className="text-slate text-lg mt-4">
            Please read these terms and conditions carefully before using our platform.
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-2xl shadow-lg p-10 space-y-10 text-slate leading-relaxed text-[1.05rem]">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our platform, you agree to comply with and be bound by these terms. If you do not agree,
              please refrain from using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">2. User Responsibilities</h2>
            <p>As a user, you agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide accurate and complete information during signup.</li>
              <li>Refrain from posting offensive, harmful, or illegal content.</li>
              <li>Respect the rights and privacy of other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">3. Intellectual Property</h2>
            <p>
              All content available on our platform—including text, graphics, and logos—is the intellectual property
              of the platform owner. Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">4. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to your account if you violate these terms or engage
              in any behavior deemed inappropriate or harmful.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">5. Limitation of Liability</h2>
            <p>
              We are not responsible for any direct or indirect damages resulting from your use of our platform.
              Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-2">6. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the platform after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="pt-6 border-t border-slate/20">
            <p>
              Thank you for using our platform. If you have any questions about these terms, feel free to contact us at{" "}
              <a href="mailto:pborade90@gmail.com" className="text-teal hover:underline">
                pborade90@gmail.com
              </a>.
            </p>
          </section>

          <p className="text-sm text-slate mt-6 text-right">
            Last updated: April 8, 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Terms;
