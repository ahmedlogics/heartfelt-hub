import { describe, expect, it } from "vitest";
import { haversineKm } from "./haversine";

describe("haversineKm", () => {
  it("returns 0 for identical points", () => {
    expect(haversineKm({ lat: 24.86, lng: 67.0 }, { lat: 24.86, lng: 67.0 })).toBe(0);
  });
  it("measures one degree of latitude as ~111.19 km", () => {
    expect(haversineKm({ lat: 0, lng: 0 }, { lat: 1, lng: 0 })).toBeCloseTo(111.19, 1);
  });
});
