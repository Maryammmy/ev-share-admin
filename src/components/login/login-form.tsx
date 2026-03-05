"use client";

import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { loginSchema, type LoginFormValues } from "@/schemas";
import { Button } from "@/components/ui/button";
import LoginField from "./login-field";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const parsedValues = loginSchema.safeParse(values);

    if (!parsedValues.success) {
      parsedValues.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof LoginFormValues | undefined;
        if (!fieldName) {
          return;
        }

        setError(fieldName, {
          type: "manual",
          message: issue.message,
        });
      });

      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("تم تسجيل الدخول بنجاح");
    router.replace("/");
  };

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <LoginField
        id="email"
        label="البريد الإلكتروني"
        placeholder="admin@evshare.app"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-2">
        <div className="text-xs text-gray-500">
          <label htmlFor="password" className="font-medium text-secondary">
            كلمة المرور
          </label>
        </div>

        <LoginField
          id="password"
          placeholder="****************"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      {/* <div className="text-xs">
        <Link href="#" className="text-secandry transition hover:text-primary">
          نسيت كلمة المرور؟
        </Link>
      </div> */}

      <motion.div whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary font-bold text-secondary shadow-[0_10px_24px_rgba(255,208,29,0.35)] hover:bg-primary/95"
        >
          <LogIn className="size-4" />
          {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </motion.div>
    </form>
  );
}

export default LoginForm;
