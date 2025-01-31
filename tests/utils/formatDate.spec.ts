import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
    it("should format date correctly ", () => {
        expect(formatDate("31-01-2025-00-00-00")).toEqual("31/01/2025");
      });
});
