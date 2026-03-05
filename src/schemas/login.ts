import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("صيغة البريد الإلكتروني غير صحيحة")
    .min(1, "البريد الإلكتروني مطلوب"),
  password: z
    .string()

    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .min(1, "كلمة المرور مطلوبة"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
