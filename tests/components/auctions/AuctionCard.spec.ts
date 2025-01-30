import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionCard from "@/components/auctions/AuctionCard.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionCard", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionCard, {});
  });

  it("should render the AuctionCard component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
