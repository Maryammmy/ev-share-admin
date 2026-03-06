import { partnersAPI } from "@/services/queries";
import { useCustomQuery } from "..";

export function usePartners(page: number) {
  return useCustomQuery(["partners", page], async () => partnersAPI(page));
}
