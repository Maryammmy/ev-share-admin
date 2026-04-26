"use client";

import { useMemo, useState } from "react";

import {
  consultationRequests,
  type ConsultationRequestStatus,
  type ConsultationRequestType,
} from "./consultation-requests-data";
import ConsultationRequestsHeading from "./consultation-requests-heading";
import ConsultationRequestsStats from "./consultation-requests-stats";
import ConsultationRequestsTable from "./consultation-requests-table";
import ConsultationRequestsToolbar from "./consultation-requests-toolbar";

type ConsultationFilterValue<T extends string> = T | "الكل";
type ConsultationSortValue = "الاحدث" | "الاقدم";

function ConsultationRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] =
    useState<ConsultationSortValue>("الاحدث");
  const [selectedStatus, setSelectedStatus] =
    useState<ConsultationFilterValue<ConsultationRequestStatus>>("الكل");
  const [selectedType, setSelectedType] =
    useState<ConsultationFilterValue<ConsultationRequestType>>("الكل");

  const filteredRequests = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const results = consultationRequests.filter((request) => {
      const matchesSearch =
        !normalizedQuery ||
        [request.name, request.phone, request.email, request.type, request.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus =
        selectedStatus === "الكل" || request.status === selectedStatus;
      const matchesType = selectedType === "الكل" || request.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });

    return selectedSort === "الاحدث" ? results : [...results].reverse();
  }, [searchQuery, selectedSort, selectedStatus, selectedType]);

  return (
    <div className="flex w-full flex-col gap-6">
      <ConsultationRequestsHeading />
      <ConsultationRequestsStats />
      <ConsultationRequestsToolbar
        searchQuery={searchQuery}
        selectedSort={selectedSort}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        onSearchChange={setSearchQuery}
        onSortChange={setSelectedSort}
        onStatusChange={setSelectedStatus}
        onTypeChange={setSelectedType}
      />
      <ConsultationRequestsTable requests={filteredRequests} />
    </div>
  );
}

export default ConsultationRequests;
