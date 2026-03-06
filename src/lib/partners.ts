import { PartnerRecord, PartnerRow } from "@/types";

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

export function getPartnerRow(
  record: PartnerRecord,
  index: number,
): PartnerRow {
  return {
    id:
      (typeof record.id === "number" || typeof record.id === "string"
        ? String(record.id)
        : null) ?? `partner-${index}`,
    name: getStringValue(record, ["name", "full_name", "partner_name"]),
    phone: getStringValue(record, ["phone", "mobile", "phone_number"]),
    city: getStringValue(record, ["city", "city_name", "region"]),
    requestedAt: formatRequestedAt(record),
    status: getStringValue(record, ["status"]),
  };
}

export function getStatusLabel(status: string) {
  if (status === "approved") return "Approved";
  if (status === "reviewing") return "Reviewing";
  return status;
}
