import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionPanelsList from "~/components/bids/AuctionPanelsList.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionPanelsList", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionPanelsList, {});
  });

  it("should render the AuctionPanelsList component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
