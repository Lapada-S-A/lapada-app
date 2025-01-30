import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SellerReviewDialog from "~/components/bids/SellerReviewDialog.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("SellerReviewDialog", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(SellerReviewDialog, {});
  });

  it("should render the SellerReviewDialog component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
