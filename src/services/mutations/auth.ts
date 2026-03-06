"use server";

import { LoginFormValues } from "@/schemas";
import { safeApi } from "..";
import { AuthResponse } from "@/types";

export const loginAPI = async (payload: LoginFormValues) =>
  await safeApi<AuthResponse>("POST", "/admin/login", payload);

export const logoutAPI = async () => await safeApi("POST", "/admin/logout");
