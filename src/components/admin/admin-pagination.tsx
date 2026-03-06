type AdminPaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

function AdminPagination({
  currentPage,
  lastPage,
  onPageChange,
}: AdminPaginationProps) {
  if (lastPage <= 1) return null;

  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-secondary px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_35px_rgba(8,23,32,0.22)]">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="grid size-8 place-items-center rounded-full text-lg leading-none text-primary transition hover:bg-white/5 disabled:cursor-not-allowed disabled:text-primary/35"
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
              className={`grid size-10 place-items-center rounded-full text-lg font-bold transition ${
                isActive
                  ? "bg-primary text-secondary"
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
          className="grid size-8 place-items-center rounded-full text-lg leading-none text-primary transition hover:bg-white/5 disabled:cursor-not-allowed disabled:text-primary/35"
          aria-label="الصفحة التالية"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default AdminPagination;
