import { describe, it, expect } from "vitest";
import { getAuctionStatusProperties } from "@/utils/getAuctionStatusProperties";
import { AuctionStatus } from "~/stores/enum";

describe("getAuctionStatusProperties", () => {
  it("should return correct properties for PENDING status", () => {
    const result = getAuctionStatusProperties(AuctionStatus.PENDING);
    expect(result).toEqual({ name: "Pendente", color: "warning" });
  });

  it("should return correct properties for OPEN status", () => {
    const result = getAuctionStatusProperties(AuctionStatus.OPEN);
    expect(result).toEqual({ name: "Aberto", color: "success" });
  });

  it("should return correct properties for FINISHED status", () => {
    const result = getAuctionStatusProperties(AuctionStatus.FINISHED);
    expect(result).toEqual({ name: "Encerrado", color: "font-100" });
  });

  it("should return correct properties for REJECTED status", () => {
    const result = getAuctionStatusProperties(AuctionStatus.REJECTED);
    expect(result).toEqual({ name: "Rejeitado", color: "error" });
  });

  it("should return correct properties for CANCELED status", () => {
    const result = getAuctionStatusProperties(AuctionStatus.CANCELED);
    expect(result).toEqual({ name: "Cancelado", color: "error" });
  });
});
