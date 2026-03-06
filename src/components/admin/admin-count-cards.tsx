import { countCards } from "@/data";
import Shimmer from "../ui/shimmer";
import { PartnersResponse } from "@/types";

type AdminCountCardsProps = {
  counts: PartnersResponse["counts"];
  isLoading: boolean;
};

function AdminCountCards({ counts, isLoading }: AdminCountCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {countCards.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"
        >
          {isLoading ? (
            <div className="space-y-4" aria-hidden="true">
              <Shimmer className="h-5 w-28" />
              <Shimmer className="h-9 w-12" />
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-secondary/65">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-black text-primary">
                {counts?.[item.key] ?? 0}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminCountCards;
