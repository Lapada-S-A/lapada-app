import { describe, it, expect } from "vitest";
import { formatSecondsToTimeString } from "@/utils/formatSecondsToTimeString";

describe("formatSecondsToTimeString", () => {
  it("should format seconds into days", () => {
    expect(formatSecondsToTimeString(172800)).toEqual("2d");
  });

  it("should format seconds into hours", () => {
    expect(formatSecondsToTimeString(7200)).toEqual("2h");
  });

  it("should format seconds into minutes", () => {
    expect(formatSecondsToTimeString(180)).toEqual("3min");
  });

  it("should format seconds into seconds", () => {
    expect(formatSecondsToTimeString(45)).toEqual("45s");
  });

  it("should handle zero seconds correctly", () => {
    expect(formatSecondsToTimeString(0)).toEqual("0s");
  });
});
