import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Package, MessageSquare, SlidersHorizontal } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DashCard, EmptyState } from "@/components/shared/States";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rider")({
  head: () => ({
    meta: [
      { title: "Rider dashboard — LogiPulse" },
      { name: "description", content: "Discover nearby pickups and manage your deliveries." },
      { property: "og:title", content: "Rider dashboard — LogiPulse" },
      { property: "og:description", content: "Discover nearby pickups and manage your deliveries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <DashboardShell
      role="Rider"
      title="Nearby pickups"
      items={[
        { label: "Nearby pickups", icon: Radar, active: true },
        { label: "My jobs", icon: Package },
        { label: "Messages", icon: MessageSquare },
      ]}
    >
      <DashCard title="Filters" description="Priority and distance filters arrive with order discovery.">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="size-4" /> Not available yet</div>
      </DashCard>
      <EmptyState icon={Radar} title="Sign in to find pickups" description="Orders near you, ranked by distance and urgency, will show here." action={<Button asChild variant="hero"><Link to="/auth" search={{ intent: "rider" }}>Sign in</Link></Button>} />
    </DashboardShell>
  ),
});
