export const PRIORITIES = ["NORMAL", "HIGH", "URGENT"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_LABEL: Record<Priority, string> = {
  NORMAL: "Normal",
  HIGH: "High",
  URGENT: "Urgent",
};
