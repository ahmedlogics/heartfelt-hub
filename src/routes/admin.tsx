import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Users, Package, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DashCard, EmptyState } from "@/components/shared/States";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin console — LogiPulse" },
      { name: "description", content: "Manage users, orders and live delivery analytics." },
      { property: "og:title", content: "Admin console — LogiPulse" },
      { property: "og:description", content: "Manage users, orders and live delivery analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <DashboardShell
      role="Admin"
      title="Operations"
      items={[
        { label: "Analytics", icon: BarChart3, active: true },
        { label: "Orders", icon: Package },
        { label: "Users", icon: Users },
      ]}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {["Orders today", "Active riders", "Delivered"].map((t) => (
          <DashCard key={t} title={t}><p className="font-display text-3xl font-bold text-muted-foreground">—</p></DashCard>
        ))}
      </div>
      <EmptyState icon={ShieldCheck} title="Admin access required" description="Live analytics load from your database once admin sign-in is enabled." action={<Button asChild variant="hero"><Link to="/auth">Sign in</Link></Button>} />
    </DashboardShell>
  ),
});
