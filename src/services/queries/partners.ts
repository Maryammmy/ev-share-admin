import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const partnersAPI = async (page: number) =>
  await baseAPI("GET", `/admin/partners?page=${page}&per_page=${PAGE_SIZE}`);
