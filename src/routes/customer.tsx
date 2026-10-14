import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, PackagePlus, Package, MessageSquare } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DashCard, EmptyState } from "@/components/shared/States";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer")({
  head: () => ({
    meta: [
      { title: "Customer dashboard — LogiPulse" },
      { name: "description", content: "Book and manage your within-city deliveries." },
      { property: "og:title", content: "Customer dashboard — LogiPulse" },
      { property: "og:description", content: "Book and manage your within-city deliveries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <DashboardShell
      role="Customer"
      title="My deliveries"
      items={[
        { label: "Overview", icon: LayoutDashboard, active: true },
        { label: "Book delivery", icon: PackagePlus },
        { label: "Orders", icon: Package },
        { label: "Messages", icon: MessageSquare },
      ]}
    >
      <EmptyState icon={Package} title="Sign in to see your orders" description="Your bookings, status timelines and rider chats will appear here." action={<Button asChild variant="hero"><Link to="/auth" search={{ intent: "customer" }}>Sign in</Link></Button>} />
      <div className="grid gap-6 md:grid-cols-2">
        <DashCard title="Active orders" description="Progress timelines for in-flight parcels."><p className="text-sm text-muted-foreground">No active orders.</p></DashCard>
        <DashCard title="Recent chats" description="Opens after a rider accepts."><p className="text-sm text-muted-foreground">No conversations yet.</p></DashCard>
      </div>
    </DashboardShell>
  ),
});
