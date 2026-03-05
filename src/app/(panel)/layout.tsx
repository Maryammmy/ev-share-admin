import Sidebar from "@/components/sidebar";
import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-svh bg-[#f5f5f5]">
      <Sidebar />
      <main className="md:pr-16 lg:pr-64">{children}</main>
    </div>
  );
}

export default AdminLayout;
