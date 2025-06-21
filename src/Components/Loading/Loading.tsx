"use client";

import { Code, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <Terminal className="w-10 h-10 text-blue-600" /> 
          <motion.div 
            className="absolute -bottom-1 -right-1 bg-blue-100 rounded-full p-1"
            animate={{ scale: [1, 1.1, 1] }}  // Reduced scale
            transition={{
              repeat: Infinity,
              duration: 1, 
              ease: "easeInOut",
            }}
          >
            <Code className="w-3 h-3 text-blue-600" /> 
          </motion.div>
        </motion.div>

        <motion.h1
          className="mt-4 text-2xl font-bold text-gray-800"  
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}  
        >
          Devscribe
        </motion.h1>
      </motion.div>

      <motion.div
        className="mt-6 relative w-56"  // Smaller width
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}  // Reduced delay
      >
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"> 
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,  // Faster loading animation
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <motion.p
        className="mt-3 text-gray-600 font-medium text-xs"  // Smaller text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}  // Reduced delay
      >
        <motion.span
          animate={{ opacity: [0.9, 1, 0.9] }}  // Less pronounced pulse
          transition={{ repeat: Infinity, duration: 1 }}  // Faster pulse
          className="inline-block"
        >
          Loading content...
        </motion.span>
      </motion.p>
    </div>
  );
};

export default Loading;