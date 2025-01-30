import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
  it("should format numbers as BRL currency", () => {
    expect(formatCurrency(1000).replace(/\s+/g, '')).toEqual("R$1.000,00");
    expect(formatCurrency(2500.5).replace(/\s+/g, '')).toEqual("R$2.500,50");
  });

  it("should handle zero correctly", () => {
    expect(formatCurrency(0).replace(/\s+/g, '')).toEqual("R$0,00");
  });
});
