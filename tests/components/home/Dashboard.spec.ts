import { describe, it, beforeEach, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Dashboard from "@/components//home/Dashboard.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

describe("Dashboard", () => {
  const onClickMock = vi.fn();

  beforeEach(async () => {
    wrapper = await mountSuspended(Dashboard, {});
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
