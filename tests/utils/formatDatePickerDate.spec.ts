import { describe, it, expect } from "vitest";
import { formatDatePickerDate } from "@/utils/formatDatePickerDate";

describe("formatDatePickerDate", () => {
  it("should return an empty string if the date is null", () => {
    expect(formatDatePickerDate(null)).toEqual("");
  });

  it("should return the correctly formatted date for a valid input", () => {
    expect(formatDatePickerDate("2025-12-01T20:00:00Z")).toEqual("01/12/2025");
  });

  it("should format the date when the input is in ISO 8601 format", () => {
    expect(formatDatePickerDate("2025-05-10T12:34:56Z")).toEqual("10/05/2025");
  });

  it("should handle invalid date inputs gracefully", () => {
    expect(formatDatePickerDate("invalid-date")).toEqual("NaN/NaN/NaN");
  });
});
