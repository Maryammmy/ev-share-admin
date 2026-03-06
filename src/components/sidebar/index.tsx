"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";
import { logoutAPI } from "@/services/mutations";
import { removeToken } from "@/lib";

function Sidebar() {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMdSidebarExpanded, setIsMdSidebarExpanded] = useState(false);

  const closeSidebar = () => setIsMobileSidebarOpen(false);

  const handleDashboardNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    window.location.assign("/");
  };

  const handleLogout = async () => {
    closeSidebar();
    await logoutAPI();
    await removeToken();
    window.location.assign("/login");
  };
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="flex h-16 items-center justify-between gap-3 px-4 md:pr-20 lg:px-6 lg:pr-72">
          <h1 className="min-w-0 truncate text-sm font-extrabold text-secondary sm:text-base md:text-lg lg:text-3xl">
            لوحة التحكم الرئيسية
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-md border border-neutral-300 p-2 text-secondary transition hover:bg-neutral-100 md:hidden"
              aria-label="فتح القائمة"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-full bg-neutral-200 text-neutral-600">
                <User size={16} className="shrink-0" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-secondary">admin</p>
                <p className="hidden text-[10px] font-semibold text-emerald-600 sm:block">
                  مدير النظام
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside className="fixed inset-y-0 right-0 z-50 hidden w-64 border-l border-neutral-300 bg-[#171a20] text-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center justify-center border-b border-black/20 bg-primary px-4">
          <Image
            src="/images/logo.svg"
            alt="EV Share"
            width={150}
            height={42}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <nav className="flex flex-1 flex-col px-3 py-4">
          <Link
            href="/"
            onClick={handleDashboardNavigation}
            className={`flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-primary text-secondary"
                : "text-primary/85 hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto flex w-full items-center gap-2 rounded-md bg-rose-600/10 px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-600/20"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </nav>
      </aside>

      <aside
        className={`fixed inset-y-0 right-0 z-40 hidden border-l border-black/20 bg-linear-to-b from-secondary to-black text-primary transition-all duration-300 md:flex md:flex-col lg:hidden ${
          isMdSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div
          className={`flex h-16 items-center bg-primary justify-between border-b border-white/10 ${
            isMdSidebarExpanded ? "px-4" : "justify-center"
          }`}
        >
          {isMdSidebarExpanded ? (
            <>
              <Image
                src="/images/logo.svg"
                alt="EV Share"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-md p-1 text-secondary transition hover:bg-black/10"
                aria-label="إغلاق القائمة"
              >
                <X size={22} />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsMdSidebarExpanded((prev) => !prev)}
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-xl font-black text-secondary"
              aria-label="Expand sidebar"
            >
              <Image
                src="/images/favicon.svg"
                alt="favicon"
                height={100}
                width={100}
                className="h-10 w-auto object-contain"
              />
            </button>
          )}
        </div>

        <nav
          className={`flex flex-1 flex-col gap-3 py-4 ${
            isMdSidebarExpanded ? "px-2" : "items-center px-2"
          }`}
        >
          <Link
            href="/"
            onClick={handleDashboardNavigation}
            className={`flex h-10 items-center rounded-xl transition ${
              isMdSidebarExpanded ? "px-3" : "w-10 justify-center"
            } ${
              pathname === "/"
                ? "bg-primary text-secondary"
                : "text-primary/85 hover:bg-white/10"
            }`}
            aria-label="Dashboard"
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {isMdSidebarExpanded ? (
              <span className="ms-2 text-sm font-semibold">لوحة التحكم</span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={`mt-auto flex h-10 items-center rounded-xl text-rose-300 transition hover:bg-rose-500/20 ${
              isMdSidebarExpanded ? "px-3" : "w-10 justify-center"
            }`}
            aria-label="Logout"
          >
            <LogOut size={18} className="shrink-0" />
            {isMdSidebarExpanded ? (
              <span className="ms-2 text-sm font-semibold">تسجيل الخروج</span>
            ) : null}
          </button>
        </nav>
      </aside>

      <div
        className={`fixed inset-0 z-30 hidden bg-black/35 transition-opacity duration-200 md:block lg:hidden ${
          isMdSidebarExpanded
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMdSidebarExpanded(false)}
      />

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          isMobileSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[84%] max-w-72 flex-col bg-[#171a20] text-white shadow-xl transition-transform duration-300 md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMobileSidebarOpen}
      >
        <div className="flex h-16 items-center justify-between border-b border-black/20 bg-primary px-4">
          <Image
            src="/images/logo.svg"
            alt="EV Share"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-md p-1 text-secondary transition hover:bg-black/10"
            aria-label="إغلاق القائمة"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-3 py-4">
          <Link
            href="/"
            onClick={(event) => {
              closeSidebar();
              handleDashboardNavigation(event);
            }}
            className={`flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-primary text-secondary"
                : "text-primary/85 hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto flex w-full items-center gap-2 rounded-md bg-rose-600/10 px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-600/20"
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
