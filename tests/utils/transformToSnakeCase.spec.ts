import { describe, it, expect } from "vitest";
import { transformToSnakeCase } from "@/utils/transformToSnakeCase";

describe("transformToSnakeCase", () => {
  it("should transform camelCase keys to snake_case", () => {
    const input = { firstName: "John", lastName: "Doe" };
    const expected = { first_name: "John", last_name: "Doe" };
    const result = transformToSnakeCase(input);
    expect(result).toEqual(expected);
  });

  it("should handle nested objects and extract the 'id' value", () => {
    const input = { user: { id: 1 }, status: "active" };
    const expected = { user: 1, status: "active" };
    const result = transformToSnakeCase(input);
    expect(result).toEqual(expected);
  });

  it("should remove keys with null or undefined values", () => {
    const input = { firstName: "John", lastName: null, age: undefined };
    const expected = { first_name: "John" };
    const result = transformToSnakeCase(input);
    expect(result).toEqual(expected);
  });

  it("should handle objects with complex structures", () => {
    const input = {
      firstName: "John",
      address: { id: 123, streetName: "Main St" },
    };
    const expected = { first_name: "John", address: 123 };
    const result = transformToSnakeCase(input);
    expect(result).toEqual(expected);
  });

  it("should leave non-object values unchanged", () => {
    const input = { age: 25, status: "active" };
    const expected = { age: 25, status: "active" };
    const result = transformToSnakeCase(input);
    expect(result).toEqual(expected);
  });
});
