import { describe, it, expect } from "vitest";
import { getBidStatusProperties } from "@/utils/getBidStatusProperties";
import { BidStatus } from "~/stores/enum";

describe("getBidStatusProperties", () => {
  it("should return correct properties for ACTIVE status", () => {
    const result = getBidStatusProperties(BidStatus.ACTIVE);
    expect(result).toEqual({ name: "Ativo", color: "success" });
  });

  it("should return correct properties for EXPIRED status", () => {
    const result = getBidStatusProperties(BidStatus.EXPIRED);
    expect(result).toEqual({ name: "Vencido", color: "error" });
  });

  it("should return correct properties for WINNER status", () => {
    const result = getBidStatusProperties(BidStatus.WINNER);
    expect(result).toEqual({ name: "Vencedor", color: "primary" });
  });
});
