import { describe, it, expect } from "vitest";
import { getUserInitials } from "@/utils/getUserInitials";

describe("getUserInitials", () => {
  it("should return initials for a username with a first and last name", () => {
    const result = getUserInitials("John Doe");
    expect(result).toEqual("JD");
  });

  it("should return initials for a username with only a first name", () => {
    const result = getUserInitials("John");
    expect(result).toEqual("J");
  });

  it("should return initials for a username with multiple name parts", () => {
    const result = getUserInitials("John Michael Doe");
    expect(result).toEqual("JD");
  });

  it("should return an empty string for an empty username", () => {
    const result = getUserInitials("");
    expect(result).toEqual("");
  });

  it("should handle usernames with more than two parts correctly", () => {
    const result = getUserInitials("John Michael Jackson Doe");
    expect(result).toEqual("JD");
  });

  it("should handle usernames with single letter parts", () => {
    const result = getUserInitials("A B");
    expect(result).toEqual("AB");
  });
});
