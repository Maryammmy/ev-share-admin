import FleetMapSection from "./fleet-map-section";
import OrderDistributionSection from "./order-distribution-section";
import QuickStatsSection from "./quick-stats-section";
import RevenueOverviewSection from "./revenue-overview-section";
import StatCardsSection from "./stat-cards-section";
import TopModelsSection from "./top-models-section";
import WeeklyRevenueSection from "./weekly-revenue-section";

function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <StatCardsSection />
      <RevenueOverviewSection />
      <QuickStatsSection />
      <div className="grid gap-4 xl:grid-cols-2">
        <WeeklyRevenueSection />
        <OrderDistributionSection />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <TopModelsSection />
        <FleetMapSection />
      </div>
    </div>
  );
}

export default Dashboard;
