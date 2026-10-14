import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LMap, Marker, Circle } from "leaflet";

export interface Pt { lat: number; lng: number }

/** Click the map to drop a pin. Leaflet is loaded in the browser only. */
export function MapPicker({
  value, onChange, center, area, other, tone = "primary", label,
}: {
  value: Pt | null;
  onChange: (p: Pt) => void;
  center: Pt;
  area?: { center: Pt; radiusKm: number } | undefined;
  other?: Pt | null;
  tone?: "primary" | "accent";
  label: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const marker = useRef<Marker | null>(null);
  const otherMarker = useRef<Marker | null>(null);
  const L = useRef<typeof import("leaflet") | null>(null);
  const cb = useRef(onChange);
  cb.current = onChange;

  const icon = (lib: typeof import("leaflet"), kind: string) =>
    lib.divIcon({ className: "", html: `<div class="map-pin map-pin-${kind}"></div>`, iconSize: [22, 22], iconAnchor: [11, 22] });

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((lib) => {
      if (cancelled || !el.current || map.current) return;
      L.current = lib;
      const m = lib.map(el.current, { zoomControl: true }).setView([center.lat, center.lng], 12);
      lib.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(m);
      if (area) {
        const c: Circle = lib.circle([area.center.lat, area.center.lng], { radius: area.radiusKm * 1000, color: "#22c55e", weight: 1, fillOpacity: 0.05 });
        c.addTo(m);
      }
      m.on("click", (e) => cb.current({ lat: +e.latlng.lat.toFixed(6), lng: +e.latlng.lng.toFixed(6) }));
      map.current = m;
      setTimeout(() => m.invalidateSize(), 50);
    });
    return () => { cancelled = true; map.current?.remove(); map.current = null; marker.current = null; otherMarker.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current, lib = L.current;
    if (!m || !lib) return;
    if (value) {
      if (!marker.current) marker.current = lib.marker([value.lat, value.lng], { icon: icon(lib, tone) }).addTo(m);
      else marker.current.setLatLng([value.lat, value.lng]);
      m.panTo([value.lat, value.lng]);
    }
    if (other) {
      if (!otherMarker.current) otherMarker.current = lib.marker([other.lat, other.lng], { icon: icon(lib, "muted"), opacity: 0.7 }).addTo(m);
      else otherMarker.current.setLatLng([other.lat, other.lng]);
    }
  });

  return <div ref={el} role="application" aria-label={label} className="h-72 w-full overflow-hidden rounded-2xl border border-border md:h-80" />;
}
