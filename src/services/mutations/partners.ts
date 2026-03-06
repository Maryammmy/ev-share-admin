"use server";

import { ChangeStatus } from "@/types";
import { safeApi } from "..";

export const changeStatusAPI = async (id: number, payload: ChangeStatus) =>
  await safeApi("PATCH", `/admin/partners/${id}/status`, payload);
