import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionList from "@/components/auctions/AuctionList.vue";
import AuctionCard from "@/components/auctions/AuctionCard.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.mock("~/stores/auctions", () => ({
  useAuctionsStore: () => ({
    getAuctionsPaginated: vi.fn().mockResolvedValue({
      items: [
        {
          created_date: "30-01-2025-23-01-26",
          end_date: "21-12-2024-10-00-00",
          id: 1,
          initial_value: 100.0,
          item_id: 1,
          min_increment: 5.0,
          seller_id: 1,
          status: "PENDING",
          title: "Auction for Item XYZA",
          type_id: 1,
        },
        {
          created_date: "30-01-2025-23-01-26",
          end_date: "21-12-2024-10-00-00",
          id: 1,
          initial_value: 100.0,
          item_id: 1,
          min_increment: 5.0,
          seller_id: 1,
          status: "PENDING",
          title: "Other",
          type_id: 1,
        },
      ],
      pagination: {
        page: 1,
        per_page: 1,
        total: 18,
      },
    }),
  }),
}));

describe("AuctionList", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionList, {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the AuctionList component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should display no results when no auctions match the search query", async () => {
    wrapper.vm.searchQuery.value = "Nonexistent Auction";
    await wrapper.vm.$nextTick();

    const noResultsCard = wrapper.find(".no-results-card");
    expect(noResultsCard.exists()).toBeTruthy();
  });

  it("should display auctions when search query matches", async () => {
    wrapper.vm.searchQuery.value = "Auction for Item XYZA";
    await wrapper.vm.$nextTick();

    const auctionCards = wrapper.findAllComponents(AuctionCard);
    expect(auctionCards.length).toBeGreaterThan(0);
  });

  it("should correctly filter auctions based on search query", async () => {
    wrapper.vm.searchQuery.value = "Other";
    await wrapper.vm.$nextTick();

    const filteredAuctions = wrapper.vm.filteredAuctions;
    expect(filteredAuctions.length).toBe(1);
    expect(filteredAuctions[0].title).toBe("Other");
  });
});
