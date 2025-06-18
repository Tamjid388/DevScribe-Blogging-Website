"use client";


import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <Terminal className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          <motion.div 
            className="absolute -bottom-1 -right-1 bg-blue-100 rounded-full p-1"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            <Code className="w-3 h-3 text-blue-600" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.h1
          className="mt-3 text-2xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Devscribe
        </motion.h1>
      </motion.div>

      <motion.div
        className="mt-5 w-56 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "10%" }}
            animate={{ width: ["10%", "90%", "10%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <motion.p
        className="mt-3 text-sm text-gray-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        Preparing your content...
      </motion.p>
    </div>
  );
};

export default Loading;