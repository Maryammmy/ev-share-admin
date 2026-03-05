const requests = [
  {
    name: "زياد العتيبي",
    phone: "0573379958",
    city: "الخبر",
    requestedAt: "منذ يومين",
  },
  {
    name: "جميلة جمال",
    phone: "0570416265",
    city: "أبها",
    requestedAt: "منذ 5 أيام",
  },
  {
    name: "نرمين الراجحي",
    phone: "0550204473",
    city: "الخبر",
    requestedAt: "منذ أسبوع",
  },
  {
    name: "عقل الحسن",
    phone: "0597964476",
    city: "الرياض",
    requestedAt: "منذ أسبوعين",
  },
];

function Admin() {
  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 py-6 lg:px-8 lg:py-10">
      <div className="w-full">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-4 py-4 lg:px-6">
            <h2 className="text-lg font-bold text-secondary">أحدث طلبات الانضمام</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-right">
              <thead className="bg-[#f8fafc] text-sm font-semibold text-secondary">
                <tr>
                  <th className="px-4 py-3 lg:px-6">الاسم</th>
                  <th className="px-4 py-3">رقم الجوال</th>
                  <th className="px-4 py-3">المدينة</th>
                  <th className="px-4 py-3 lg:px-6">تاريخ الطلب</th>
                </tr>
              </thead>
              <tbody className="text-sm text-secondary/90">
                {requests.map((row) => (
                  <tr key={row.phone} className="border-t border-neutral-100">
                    <td className="px-4 py-4 lg:px-6">{row.name}</td>
                    <td className="px-4 py-4">{row.phone}</td>
                    <td className="px-4 py-4">{row.city}</td>
                    <td className="px-4 py-4 lg:px-6">{row.requestedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
