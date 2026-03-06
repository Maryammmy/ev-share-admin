type TableShimmerProps = {
  columns: number;
  rows?: number;
};

function TableShimmer({ columns, rows = 5 }: TableShimmerProps) {
  return (
    <tbody className="text-sm text-secondary/90">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-t border-neutral-100">
          {Array.from({ length: columns }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4 lg:px-6">
              <div className="h-4 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-full animate-pulse bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-100" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableShimmer;
