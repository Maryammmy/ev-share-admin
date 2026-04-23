import { topModels } from "@/data/dashboard";
import { DashboardSectionCard, TrendBadge } from "./dashboard-shared";

function TopModelsSection() {
  return (
    <DashboardSectionCard className="p-6">
      <div className="space-y-1 text-right">
        <h2 className="text-2xl font-semibold text-secondary">
          الموديلات الأعلى طلبا
        </h2>
        <p className="text-sm font-medium text-gray">
          أكثر السكوترات والدراجات طلبًا هذا الأسبوع
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[22px] border border-primary/10">
        {/* ── Header ── */}
        <div className="grid grid-cols-[minmax(0,1fr)_60px_80px] sm:grid-cols-[minmax(0,1fr)_80px_92px] items-center gap-2 sm:gap-4 bg-background px-3 sm:px-4 py-4 text-xs sm:text-sm font-semibold text-secondary">
          <div className="text-right">الموديل</div>
          <div className="text-right">الطلبات</div>
          <div className="text-right">الأداء</div>
        </div>

        {/* ── Rows ── */}
        <div className="divide-y divide-primary/10">
          {topModels.map((model) => {
            const Icon = model.icon;

            return (
              <div
                key={model.id}
                className="grid grid-cols-[minmax(0,1fr)_60px_80px] sm:grid-cols-[minmax(0,1fr)_80px_92px] items-center gap-2 sm:gap-4 px-3 sm:px-4 py-4"
              >
                {/* الموديل */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-full bg-primary/20 text-secondary">
                    <Icon className="size-4 sm:size-5" />
                  </div>

                  <div className="text-right min-w-0">
                    <p className="truncate text-sm sm:text-base font-semibold text-secondary">
                      {model.category} {model.model}
                    </p>
                    <p className="truncate text-xs sm:text-sm font-medium text-gray">
                      {model.sku}
                    </p>
                  </div>
                </div>

                {/* الطلبات */}
                <div className="self-start text-right text-base sm:text-lg font-semibold text-dark-gray">
                  {model.orders}
                </div>

                {/* الأداء */}
                <div className="flex justify-start">
                  <TrendBadge
                    value={model.performance}
                    direction={model.direction}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardSectionCard>
  );
}

export default TopModelsSection;
