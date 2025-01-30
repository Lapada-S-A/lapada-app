import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionList from "@/components/auctions/AuctionList.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionList", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionList, {});
  });

  it("should render the AuctionList component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
