"use client";

import { motion } from "framer-motion";

function LoginHeaderCompact() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className="w-full text-center"
    >
      <div>
        <p className="text-4xl font-black tracking-wide text-primary">
          EV SHARE
        </p>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-white">مرحبا بك مجددا</h1>
      <p className="mt-1.5 text-sm text-white">سجل الدخول لإدارة حسابك</p>
    </motion.header>
  );
}

export default LoginHeaderCompact;
