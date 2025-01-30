import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SellerActions from "~/components/bids/SellerActions.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("SellerActions", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(SellerActions, {});
  });

  it("should render the SellerActions component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
