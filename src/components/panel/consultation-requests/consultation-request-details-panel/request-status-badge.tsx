import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ConsultationRequestStatus } from "../consultation-requests-data";

const REQUEST_STATUS_STYLES: Record<ConsultationRequestStatus, string> = {
  جديد: "bg-green-50 text-[#00a63e]",
  مغلق: "bg-gray-100 text-dark-gray",
  "تم التواصل": "bg-amber-50 text-amber-600",
};

function RequestStatusBadge({ status }: { status: ConsultationRequestStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-[38px] items-center justify-center gap-2 rounded-full px-3 text-base font-medium leading-6",
        REQUEST_STATUS_STYLES[status],
      )}
    >
      <ChevronDown className="size-3.5" />
      {status}
    </span>
  );
}

export default RequestStatusBadge;
