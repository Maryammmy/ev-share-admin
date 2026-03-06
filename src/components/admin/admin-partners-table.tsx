"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TableShimmer from "@/components/ui/table-shimmer";
import { changeStatusAPI } from "@/services/mutations";
import { PartnerRow } from "@/types";
import { formatPhoneNumber, getStatusLabel } from "@/lib";

type AdminPartnersTableProps = {
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  rows: PartnerRow[];
  pendingId: string | null;
  onApproveStart: (id: string | null) => void;
  onRefresh: () => Promise<unknown>;
};

async function handleApprovePartner(
  id: string,
  onApproveStart: (id: string | null) => void,
  onRefresh: () => Promise<unknown>,
) {
  onApproveStart(id);

  const result = await changeStatusAPI(Number(id), { status: "approved" });

  if (result?.ok) {
    toast.success(result?.message || "Status updated successfully");
    await onRefresh();
    onApproveStart(null);
    return;
  }

  toast.error(result?.message || "Failed to update status");
  onApproveStart(null);
}

function AdminPartnersTable({
  isLoading,
  isError,
  isFetching,
  rows,
  pendingId,
  onApproveStart,
  onRefresh,
}: AdminPartnersTableProps) {
  return (
    <>
      <div className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div>
          <h2 className="text-lg font-bold text-secondary">
            أحدث طلبات الانضمام
          </h2>
          <p className="mt-1 text-sm text-secondary/60">{rows.length} طلب</p>
        </div>

        {isFetching && !isLoading ? (
          <span className="text-sm font-medium text-primary">
            جاري تحديث البيانات...
          </span>
        ) : null}
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
          <p className="text-sm text-secondary/70">
            حدث خطأ أثناء تحميل بيانات الشركاء.
          </p>
          <button
            type="button"
            onClick={() => {
              void onRefresh();
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-secondary transition hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-right">
            <thead className="bg-[#f8fafc] text-sm font-semibold text-secondary">
              <tr>
                <th className="px-4 py-3 lg:px-6">الاسم</th>
                <th className="px-4 py-3">رقم الجوال</th>
                <th className="px-4 py-3">المدينة</th>
                <th className="px-4 py-3 lg:px-6">تاريخ الطلب</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3 lg:px-6">الإجراء</th>
              </tr>
            </thead>

            {isLoading ? (
              <TableShimmer columns={6} />
            ) : (
              <tbody className="text-sm text-secondary/90">
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr key={row.id} className="border-t border-neutral-100">
                      <td className="px-4 py-4 lg:px-6">{row.name}</td>
                      <td className="px-4 py-4" dir="ltr">
                        {formatPhoneNumber(row.phone)}
                      </td>
                      <td className="px-4 py-4">{row.city}</td>
                      <td className="px-4 py-4 lg:px-6">{row.requestedAt}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-secondary/8 px-3 py-1 text-xs font-semibold text-secondary">
                          {getStatusLabel(row.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 lg:px-6">
                        {row.status === "reviewing" ? (
                          <Button
                            type="button"
                            size="sm"
                            disabled={pendingId === row.id}
                            onClick={() => {
                              void handleApprovePartner(
                                row.id,
                                onApproveStart,
                                onRefresh,
                              );
                            }}
                            className="h-9 rounded-lg bg-primary px-4 font-bold text-secondary hover:bg-primary/95"
                          >
                            {pendingId === row.id ? <Loader /> : "Approved"}
                          </Button>
                        ) : (
                          <span className="text-sm text-secondary/45">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-neutral-100">
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-secondary/60"
                    >
                      لا توجد بيانات حالياً.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      )}
    </>
  );
}

export default AdminPartnersTable;
