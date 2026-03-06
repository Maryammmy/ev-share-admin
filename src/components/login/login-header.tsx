"use client";

import { motion } from "framer-motion";

function LoginHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className="w-ful text-center"
    >
      <div>
        {/* <Image
          src="/images/logo.svg"
          alt="EV Share"
          width={44}
          height={44}
          className="size-11 object-contain"
          priority
        /> */}
        <p className="text-primary text-4xl font-black tracking-wide">
          EV SHARE
        </p>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white">مرحبا بك مجددا</h1>
      <p className="mt-2 text-sm text-white">سجل الدخول لإدارة حسابك</p>
    </motion.header>
  );
}

export default LoginHeader;
