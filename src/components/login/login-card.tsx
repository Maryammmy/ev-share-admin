"use client";

import { motion } from "framer-motion";
import LoginForm from "./login-form";

function LoginCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
      className="w-full rounded-2xl border border-primary/30 bg-white p-4 shadow-[0_22px_45px_rgba(0,0,0,0.35)] md:p-5"
    >
      <LoginForm />
    </motion.section>
  );
}

export default LoginCard;
