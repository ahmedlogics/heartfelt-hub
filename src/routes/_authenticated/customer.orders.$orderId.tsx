import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, MessageSquareLock, User, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CardSkeleton, DashCard, ErrorState } from "@/components/shared/States";
import { CareTag, FareReceipt, ProgressBar, StatusBadge, StatusTimeline } from "@/components/shared/OrderBits";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Button } from "@/components/ui/button";
import { customerNav } from "@/features/customer/nav";
import { orderQuery } from "@/features/orders/orders";

export const Route = createFileRoute("/_authenticated/customer/orders/$orderId")({
  validateSearch: (s: Record<string, unknown>): { created?: boolean } => (s["created"] ? { created: true } : {}),
  head: () => ({
    meta: [
      { title: "Order details — LogiPulse" },
      { name: "description", content: "Track your delivery status and fare breakdown." },
      { property: "og:title", content: "Order details — LogiPulse" },
      { property: "og:description", content: "Track your delivery status and fare breakdown." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: async ({ context, params }) => {
    const d = await context.queryClient.ensureQueryData(orderQuery(params.orderId));
    if (!d.order) throw notFound();
  },
  pendingComponent: () => <DashboardShell role="Customer" title="Order" items={customerNav("orders")}><CardSkeleton rows={6} /></DashboardShell>,
  errorComponent: ({ error }) => {
    const router = useRouter();
    return <div className="p-8"><ErrorState description={(error as Error).message} /><Button className="mt-4" onClick={() => router.invalidate()}>Retry</Button></div>;
  },
  notFoundComponent: () => (
    <DashboardShell role="Customer" title="Order" items={customerNav("orders")}>
      <ErrorState title="Order not found" description="This order doesn't exist or isn't yours." />
      <Button asChild variant="glass"><Link to="/customer/orders" search={{ tab: "all" }}>Back to orders</Link></Button>
    </DashboardShell>
  ),
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const { created } = Route.useSearch();
  const { data } = useSuspenseQuery(orderQuery(orderId));
  const o = data.order!;
  const chatOpen = o.rider_id && o.status !== "PENDING" && o.status !== "CANCELLED";
  return (
    <DashboardShell role="Customer" title="Order details" items={customerNav("orders")}>
      <Link to="/customer/orders" search={{ tab: "all" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All orders</Link>
      {created && (
        <div className="animate-enter flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-4">
          <CheckCircle2 className="animate-pop size-8 text-success" />
          <div><p className="font-semibold">Booking confirmed</p><p className="text-sm text-muted-foreground">We're finding a rider near your pickup point.</p></div>
        </div>
      )}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={o.status} /><PriorityBadge priority={o.priority} />{o.handle_with_care && <CareTag />}
          <span className="ml-auto font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="mt-4"><ProgressBar status={o.status} /></div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <DashCard title="Route">
            <div className="space-y-4 text-sm">
              <div className="flex gap-3"><MapPin className="mt-0.5 size-4 text-primary" /><div><p className="font-medium">Pickup</p><p>{o.pickup_address}</p><p className="font-mono text-xs text-muted-foreground">{o.pickup_lat}, {o.pickup_lng}</p></div></div>
              <div className="flex gap-3"><MapPin className="mt-0.5 size-4 text-accent" /><div><p className="font-medium">Drop-off</p><p>{o.dropoff_address}</p><p className="font-mono text-xs text-muted-foreground">{o.dropoff_lat}, {o.dropoff_lng}</p></div></div>
              <div className="flex gap-3"><User className="mt-0.5 size-4 text-muted-foreground" /><div><p className="font-medium">Recipient</p><p>{o.recipient_name} · {o.recipient_phone}</p><p className="text-muted-foreground">{o.parcel_description}</p></div></div>
            </div>
          </DashCard>
          <DashCard title="Tracking"><StatusTimeline order={o} events={data.events} /></DashCard>
        </div>
        <div className="space-y-6">
          <DashCard title="Fare receipt">
            <FareReceipt distanceKm={o.distance_km} vehicle={o.vehicle_type} base={o.base_fare} distance={o.distance_fare} care={o.care_fee} total={o.total_fare} />
          </DashCard>
          <DashCard title="Rider">
            {o.rider_id ? <p className="text-sm">A rider has accepted your order.</p> : <p className="text-sm text-muted-foreground">Waiting for a rider to accept.</p>}
            <Button className="mt-4 w-full" variant="glass" disabled={!chatOpen}><MessageSquareLock /> {chatOpen ? "Open chat" : "Chat opens after acceptance"}</Button>
          </DashCard>
        </div>
      </div>
    </DashboardShell>
  );
}
