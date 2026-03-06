"use client";

import { motion } from "framer-motion";
import LoginHeader from "./login-header";
import LoginCard from "./login-card";

function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f1118] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-[image:url('/images/scooter.jpg')] bg-size-[100%_100%] bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 bg-[#0f1118]/72" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col items-center justify-center gap-7"
      >
        <LoginHeader />
        <LoginCard />
      </motion.div>
    </main>
  );
}

export default Login;
