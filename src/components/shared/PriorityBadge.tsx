import { cn } from "@/lib/utils";
import { PRIORITY_LABEL, type Priority } from "@/features/priority/priority";

const styles: Record<Priority, string> = {
  NORMAL: "bg-secondary text-secondary-foreground",
  HIGH: "bg-warning/15 text-warning",
  URGENT: "bg-destructive/15 text-destructive",
};

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", styles[priority], className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {PRIORITY_LABEL[priority]}
    </span>
  );
}
