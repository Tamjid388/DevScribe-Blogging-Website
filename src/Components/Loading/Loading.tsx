"use client";

import { BookOpen } from "lucide-react"; // optional, nice icon
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center
     justify-center ">
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <BookOpen className="w-10 h-10 text-blue-700 animate-pulse" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          Devscribe
        </h1>
      </motion.div>

      <motion.div
        className="mt-6 w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      <p className="mt-4 text-gray-600 font-medium text-sm animate-pulse">
      Loading Devscribe content...
      </p>
    </div>
  );
};

export default Loading;
