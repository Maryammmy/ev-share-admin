"use client";

import { useState } from "react";
import { usePartners } from "@/hooks";
import AdminCountCards from "./admin-count-cards";
import AdminPagination from "./admin-pagination";
import AdminPartnersTable from "./admin-partners-table";
import { PartnersResponse } from "@/types";
import { getPartnerRow } from "@/lib";

function Admin() {
  const [page, setPage] = useState(1);
  const [pendingId, setPendingId] = useState<string | null>(null);
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
        <AdminCountCards counts={counts} isLoading={isLoading} />

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <AdminPartnersTable
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            rows={rows}
            pendingId={pendingId}
            onApproveStart={setPendingId}
            onRefresh={refetch}
          />

          <div className="border-t border-neutral-100 px-4 py-4 lg:px-6">
            <div className="flex justify-center">
              <div className="w-full lg:w-auto">
                <AdminPagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
