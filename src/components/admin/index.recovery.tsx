"use client";

import { useState } from "react";
import { usePartners } from "@/hooks";
import { PartnersResponse } from "@/types";

type PartnerRecord = Record<string, unknown>;

const countCards = [
  {
    key: "all",
    label: "كل الطلبات",
  },
  {
    key: "reviewing",
    label: "قيد المراجعة",
  },
  {
    key: "approved",
    label: "تمت الموافقة",
  },
] as const;

function getStringValue(record: PartnerRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  return "غير متوفر";
}

function formatRequestedAt(record: PartnerRecord) {
  const rawValue =
    record.requestedAt ??
    record.requested_at ??
    record.created_at ??
    record.createdAt;

  if (typeof rawValue !== "string" || !rawValue.trim()) {
    return "غير متوفر";
  }

  const parsedDate = new Date(rawValue);
  if (Number.isNaN(parsedDate.getTime())) return rawValue;

  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

function getPartnerRow(record: PartnerRecord, index: number) {
  return {
    id:
      (typeof record.id === "number" || typeof record.id === "string"
        ? String(record.id)
        : null) ?? `partner-${index}`,
    name: getStringValue(record, ["name", "full_name", "partner_name"]),
    phone: getStringValue(record, ["phone", "mobile", "phone_number"]),
    city: getStringValue(record, ["city", "city_name", "region"]),
    requestedAt: formatRequestedAt(record),
  };
}

function TableShimmer() {
  return (
    <tbody className="text-sm text-secondary/90">
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-t border-neutral-100">
          {Array.from({ length: 4 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4 lg:px-6">
              <div className="h-4 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-full animate-pulse bg-linear-to-r from-neutral-100 via-primary/30 to-neutral-100" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}) {
  if (lastPage <= 1) return null;

  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-secondary px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_35px_rgba(8,23,32,0.22)]">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="grid size-10 place-items-center rounded-full text-2xl leading-none text-primary transition hover:bg-white/5 disabled:cursor-not-allowed disabled:text-primary/35"
          aria-label="الصفحة السابقة"
        >
          &#8249;
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`grid size-12 place-items-center rounded-full text-2xl font-bold transition ${
                isActive
                  ? "bg-primary text-secondary shadow-[0_12px_25px_rgba(22,238,168,0.25)]"
                  : "text-white/85 hover:bg-white/5 hover:text-primary"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="grid size-10 place-items-center rounded-full text-2xl leading-none text-primary transition hover:bg-white/5 disabled:cursor-not-allowed disabled:text-primary/35"
          aria-label="الصفحة التالية"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

function Admin() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch, isFetching } = usePartners(page);

  const response = (data ?? {}) as PartnersResponse;
  const counts = response.counts ?? {};
  const pagination = response.data;
  const rows = (pagination?.data ?? []).map(getPartnerRow);
  const currentPage = pagination?.current_page ?? page;
  const lastPage = pagination?.last_page ?? 1;

  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {countCards.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-secondary/65">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-black text-primary">
                {counts[item.key] ?? 0}
              </p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div>
              <h2 className="text-lg font-bold text-secondary">
                أحدث طلبات الانضمام
              </h2>
              <p className="mt-1 text-sm text-secondary/60">
                {pagination?.total ?? 0} طلب
              </p>
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
                onClick={() => refetch()}
                className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-secondary transition hover:bg-primary/90"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-170 text-right">
                  <thead className="bg-[#f8fafc] text-sm font-semibold text-secondary">
                    <tr>
                      <th className="px-4 py-3 lg:px-6">الاسم</th>
                      <th className="px-4 py-3">رقم الجوال</th>
                      <th className="px-4 py-3">المدينة</th>
                      <th className="px-4 py-3 lg:px-6">تاريخ الطلب</th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <TableShimmer />
                  ) : (
                    <tbody className="text-sm text-secondary/90">
                      {rows.length > 0 ? (
                        rows.map((row) => (
                          <tr
                            key={row.id}
                            className="border-t border-neutral-100"
                          >
                            <td className="px-4 py-4 lg:px-6">{row.name}</td>
                            <td className="px-4 py-4">{row.phone}</td>
                            <td className="px-4 py-4">{row.city}</td>
                            <td className="px-4 py-4 lg:px-6">
                              {row.requestedAt}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="border-t border-neutral-100">
                          <td
                            colSpan={4}
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

              <div className="border-t border-neutral-100 px-4 py-4 lg:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <p className="text-sm text-secondary/60">
                    عرض {pagination?.from ?? 0} - {pagination?.to ?? 0} من{" "}
                    {pagination?.total ?? 0}
                  </p>

                  <div className="w-full lg:w-auto">
                    <Pagination
                      currentPage={currentPage}
                      lastPage={lastPage}
                      onPageChange={setPage}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;
