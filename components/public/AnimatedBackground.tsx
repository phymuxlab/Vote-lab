"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute right-20 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]"
      />
    </>
  );
}