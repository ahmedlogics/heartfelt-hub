import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LogiPulse — Fast within-city parcel delivery" },
      { name: "description", content: "Book same-city deliveries, get matched with nearby riders and chat until your parcel arrives." },
      { property: "og:title", content: "LogiPulse — Fast within-city parcel delivery" },
      { property: "og:description", content: "Book same-city deliveries, get matched with nearby riders and chat until your parcel arrives." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
