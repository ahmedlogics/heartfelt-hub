import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold" aria-label="LogiPulse home">
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-signal text-primary-foreground shadow-glow">
        <Activity className="size-4" />
      </span>
      <span>Logi<span className="text-gradient">Pulse</span></span>
    </Link>
  );
}
