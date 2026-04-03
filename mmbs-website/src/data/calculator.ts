import type { ServiceSlug } from "@/lib/constants";

export const PRICING: Record<ServiceSlug, { base: number; unit: string }> = {
  metselwerk: { base: 85, unit: "m²" },
  gevelrenovatie: { base: 65, unit: "m²" },
  "monumentale-restauratie": { base: 150, unit: "m²" },
  isolatie: { base: 45, unit: "m²" },
  steigerbouw: { base: 25, unit: "m²" },
} as const;

export type Condition = "good" | "fair" | "poor";

const CONDITION_MULTIPLIER: Record<Condition, number> = {
  good: 1.0,
  fair: 1.25,
  poor: 1.5,
};

const FLOOR_MULTIPLIER = (floors: number): number => {
  if (floors <= 1) return 1.0;
  if (floors <= 3) return 1.1;
  if (floors <= 6) return 1.2;
  return 1.35;
};

export function calculateEstimate(
  service: ServiceSlug,
  surfaceM2: number,
  floors: number,
  condition: Condition,
): { min: number; max: number; base: number } {
  const pricing = PRICING[service];
  const base = pricing.base * surfaceM2 * CONDITION_MULTIPLIER[condition] * FLOOR_MULTIPLIER(floors);
  return {
    base: Math.round(base),
    min: Math.round(base * 0.9),
    max: Math.round(base * 1.15),
  };
}
