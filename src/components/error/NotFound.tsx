// components/error/NotFound.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 mt-16">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated 404 */}
          <motion.div
            className="text-8xl md:text-9xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.span
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              4
            </motion.span>
            <motion.span
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-block text-[#005cad] mx-2"
            >
              0
            </motion.span>
            <motion.span
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              4
            </motion.span>
          </motion.div>

          {/* Floating Icons */}
          <div className="relative mb-8">
            <motion.div
              className="absolute -top-4 -left-4 text-4xl text-[#005cad] opacity-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <i className="fas fa-search"></i>
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-4 text-3xl text-[#005cad] opacity-20"
              animate={{
                y: [0, -8, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <i className="fas fa-compass"></i>
            </motion.div>
          </div>

          {/* Message */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 w-full sm:w-auto"
              >
                <i className="fas fa-home mr-2"></i>
                Back to Homepage
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 w-full sm:w-auto"
              >
                <i className="fas fa-envelope mr-2"></i>
                Contact Support
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-gray-500 mb-4">Or try these helpful links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { href: "/features", label: "Features", icon: "fas fa-star" },
                { href: "/pricing", label: "Pricing", icon: "fas fa-tag" },
                { href: "/resources", label: "Resources", icon: "fas fa-book" },
                {
                  href: "/use-cases",
                  label: "Use Cases",
                  icon: "fas fa-briefcase",
                },
              ].map((link, index) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className="text-[#005cad] hover:text-[#1e40af] transition-colors duration-300 flex items-center gap-1"
                    whileHover={{ x: 3 }}
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
