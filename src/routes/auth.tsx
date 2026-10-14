import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

type Search = { intent?: "customer" | "rider" | undefined };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    intent: s["intent"] === "customer" || s["intent"] === "rider" ? s["intent"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — LogiPulse" },
      { name: "description", content: "Sign in to LogiPulse as a customer, rider or admin." },
      { property: "og:title", content: "Sign in — LogiPulse" },
      { property: "og:description", content: "Sign in to LogiPulse as a customer, rider or admin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { intent } = Route.useSearch();
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-surface px-6">
      <div className="glass w-full max-w-md rounded-3xl p-8 shadow-soft">
        <Logo />
        <div className="mt-8 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Lock /></div>
        <h1 className="mt-4 text-2xl font-bold">Sign in is coming next</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {intent === "rider" ? "Rider accounts" : intent === "customer" ? "Customer bookings" : "Accounts"} will be available once secure sign-in is switched on in the next phase.
        </p>
        <Button asChild variant="glass" className="mt-6"><Link to="/">Back to home</Link></Button>
      </div>
    </div>
  );
}
