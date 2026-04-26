import {
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import EmptyState from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import {
  consultationRequests,
  type ConsultationRequest,
  type ConsultationRequestStatus,
  type ConsultationRequestType,
} from "./consultation-requests-data";

function ConsultationRequestsTable({
  requests = consultationRequests,
  onViewRequest,
}: {
  requests?: ConsultationRequest[];
  onViewRequest?: (request: ConsultationRequest) => void;
}) {
  return (
    <section className="space-y-4 md:space-y-0 md:overflow-hidden md:rounded-lg md:bg-white">
      <div className="space-y-4 md:hidden">
        {requests.map((request) => (
          <MobileRequestCard
            key={request.id}
            request={request}
            onViewRequest={onViewRequest}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1024px] border-separate border-spacing-0 text-right">
          <thead>
            <tr className="bg-primary/8 text-base font-semibold leading-6 text-dark-gray">
              <TableHead className="w-[211px]">الاسم</TableHead>
              <TableHead>الهاتف</TableHead>
              <TableHead className="w-[250px]">البريد الإلكتروني</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الإجراءات</TableHead>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="text-base font-medium text-dark-gray">
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>
                  <TypeBadge type={request.type} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      icon={Eye}
                      label="عرض طلب الاستشارة"
                      className="bg-blue-50 text-blue-600"
                      onClick={() => onViewRequest?.(request)}
                    />
                    <ActionButton
                      icon={Pencil}
                      label="تعديل طلب الاستشارة"
                      className="bg-amber-50 text-orange-500"
                    />
                    <ActionButton
                      icon={Trash2}
                      label="حذف طلب الاستشارة"
                      className="bg-red-50 text-red-500"
                    />
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!requests.length ? (
        <EmptyState description="لم نتمكن من العثور على طلبات استشارة جرب تعديل معايير البحث" />
      ) : null}
    </section>
  );
}

function MobileRequestCard({
  request,
  onViewRequest,
}: {
  request: ConsultationRequest;
  onViewRequest?: (request: ConsultationRequest) => void;
}) {
  return (
    <article>
      <div className="rounded-2xl border border-primary/15 bg-white p-4 text-right text-sm font-medium text-dark-gray">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-secondary">
              {request.name}
            </h3>
            <p className="mt-1 text-xs text-gray">{request.date}</p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="mt-4 grid gap-3">
          <InfoRow label="الهاتف" value={request.phone} />
          <InfoRow label="البريد الإلكتروني" value={request.email} />
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray">النوع</span>
            <TypeBadge type={request.type} />
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-2 px-1">
        <ActionButton
          icon={Eye}
          label="عرض طلب الاستشارة"
          className="bg-blue-50 text-blue-600"
          onClick={() => onViewRequest?.(request)}
        />
        <ActionButton
          icon={Pencil}
          label="تعديل طلب الاستشارة"
          className="bg-amber-50 text-orange-500"
        />
        <ActionButton
          icon={Trash2}
          label="حذف طلب الاستشارة"
          className="bg-red-50 text-red-500"
        />
      </div>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-gray">{label}</span>
      <span className="min-w-0 truncate text-left">{value}</span>
    </div>
  );
}

function TableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("border-b border-primary/15 px-5 py-5", className)}>
      {children}
    </th>
  );
}

function TableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("h-16 border-b border-primary/15 px-5 py-3", className)}>
      {children}
    </td>
  );
}

function TypeBadge({ type }: { type: ConsultationRequestType }) {
  const className = {
    مبيعات: "bg-blue-50 text-blue-600",
    تقني: "bg-purple-50 text-purple-600",
    دعم: "bg-amber-50 text-amber-600",
    عام: "bg-gray-100 text-dark-gray",
  }[type];

  return (
    <span
      className={cn(
        "inline-flex h-[38px] min-w-16 items-center justify-center rounded-full px-4 text-sm",
        className,
      )}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: ConsultationRequestStatus }) {
  const config = {
    جديد: "bg-green-50 text-green",
    مغلق: "bg-gray-100 text-dark-gray",
    "تم التواصل": "bg-amber-50 text-amber-600",
  }[status];

  return (
    <span
      className={cn(
        "inline-flex h-[38px] min-w-[98px] items-center justify-center gap-2 rounded-full px-4 text-sm",
        config,
      )}
    >
      <ChevronDown className="size-4" />
      {status}
    </span>
  );
}

function ActionButton({
  icon: Icon,
  label,
  className,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid size-11 place-items-center rounded-lg transition hover:brightness-95",
        className,
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}

export default ConsultationRequestsTable;
