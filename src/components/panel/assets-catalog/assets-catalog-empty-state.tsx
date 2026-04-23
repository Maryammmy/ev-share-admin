const emptyStateImage =
  "https://www.figma.com/api/mcp/asset/363209d6-647e-4bba-923e-f209f419fd9a";

function AssetsCatalogEmptyState() {
  return (
    <section className="flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl bg-white px-6 py-12">
      <div className="flex w-full max-w-[300px] flex-col items-center gap-4 text-center">
        <div className="relative h-[229px] w-full overflow-hidden">
          <div
            className="absolute left-0 top-[-21%] h-[131%] w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${emptyStateImage})` }}
            aria-hidden="true"
          />
        </div>

        <div className="flex w-[221px] flex-col items-center gap-2">
          <h2 className="text-2xl font-medium leading-8 text-[#101828]">
            لا توجد نتائج مطابقة
          </h2>
          <p className="text-sm font-medium leading-5 text-[#9da4ae]">
            لم نتمكن من العثور على أصول جرب تعديل معايير البحث
          </p>
        </div>
      </div>
    </section>
  );
}

export default AssetsCatalogEmptyState;
