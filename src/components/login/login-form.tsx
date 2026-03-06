"use client";

import {
  useForm,
  type FieldErrors,
  type Resolver,
  type ResolverError,
  type ResolverSuccess,
} from "react-hook-form";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { loginSchema, type LoginFormValues } from "@/schemas";
import { Button } from "@/components/ui/button";
import LoginField from "./login-field";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/services/mutations";
import { setToken } from "@/lib";
import Loader from "../ui/loader";
import InputErrorMessage from "../ui/input-error-message";

const loginFormResolver: Resolver<LoginFormValues> = async (values) => {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    const successResult: ResolverSuccess<LoginFormValues> = {
      values: result.data,
      errors: {},
    };

    return successResult;
  }

  const fieldErrors = result.error.flatten().fieldErrors;
  const errors: FieldErrors<LoginFormValues> = {};

  if (fieldErrors.email?.[0]) {
    errors.email = {
      type: "manual",
      message: fieldErrors.email[0],
    };
  }

  if (fieldErrors.password?.[0]) {
    errors.password = {
      type: "manual",
      message: fieldErrors.password[0],
    };
  }

  const errorResult: ResolverError<LoginFormValues> = {
    values: {},
    errors,
  };

  return errorResult;
};

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: loginFormResolver,
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await loginAPI(data);
    if (result?.ok) {
      toast.success(result?.message || "Login successful");
      const token = result?.data?.data?.token;
      if (token) await setToken(token);
      router.replace("/");
      return;
    }
    toast.error(result?.message);
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

      <InputErrorMessage msg={errors.root?.message} />

      {/* <div className="text-xs">
        <Link href="#" className="text-secondary transition hover:text-primary">
          نسيت كلمة المرور؟
        </Link>
      </div> */}

      <motion.div whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary font-bold text-secondary shadow-[0_10px_24px_rgba(255,208,29,0.35)] hover:bg-primary/95"
        >
          {isSubmitting ? (
            <Loader />
          ) : (
            <>
              {" "}
              <LogIn className="size-4" />
              تسجيل الدخول
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}

export default LoginForm;
