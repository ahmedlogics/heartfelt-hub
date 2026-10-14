import { LayoutDashboard, PackagePlus, Package } from "lucide-react";
import type { NavItem } from "@/components/layout/DashboardShell";

export const customerNav = (active: "overview" | "book" | "orders"): NavItem[] => [
  { label: "Overview", icon: LayoutDashboard, to: "/customer", active: active === "overview" },
  { label: "New delivery", icon: PackagePlus, to: "/customer/book", active: active === "book" },
  { label: "My orders", icon: Package, to: "/customer/orders", active: active === "orders" },
];
