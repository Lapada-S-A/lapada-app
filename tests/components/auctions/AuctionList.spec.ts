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

vi.mock("~/stores/types", () => ({
  useTypesStore: () => ({
    loading: false,
    getAllTypes: vi.fn().mockResolvedValue([{ id: 1, name: "Type 1" }]),
    getTypeById: vi.fn().mockResolvedValue({ id: 1, name: "Type 1" }),
  }),
}));

vi.mock("~/stores/categories", () => ({
  useCategoriesStore: () => ({
    loading: false,
    getAllCategories: vi
      .fn()
      .mockResolvedValue([{ id: 1, name: "Category 1" }]),
  }),
}));

vi.mock("~/stores/auctions", () => ({
  useAuctionsStore: () => ({
    loading: false,
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
          status: 2,
          title: "Auction for Item XYZA",
          highest_bid: 1000,
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
          status: 2,
          title: "Other",
          highest_bid: 1000,
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

  it("should display AuctionCard components when auctions are loaded", async () => {
    await wrapper.vm.$nextTick();
    const auctionCards = wrapper.findAllComponents(AuctionCard);
    expect(auctionCards.length).toBeGreaterThan(0);
  });

  it("should filter auctions based on search query", async () => {
    wrapper.vm.searchQuery.value = "Auction for Item XYZA";
    await wrapper.vm.$nextTick();

    const auctionCards = wrapper.findAllComponents(AuctionCard);
    expect(auctionCards.length).toBe(1);
    expect(auctionCards[0].props("auction").title).toBe(
      "Auction for Item XYZA"
    );
  });

  it("should handle page navigation buttons correctly", async () => {
    wrapper.vm.currentPage.value = 2;
    wrapper.vm.totalAuctions.value = 4;
    wrapper.vm.auctionsPerPage.value = 1;

    const prevButton = wrapper.find("#previous-auctions-page-btn");
    const nextButton = wrapper.find("#next-auctions-page-btn");

    await prevButton.trigger("click");
    expect(wrapper.vm.currentPage.value).toBe(1);

    await nextButton.trigger("click");
    expect(wrapper.vm.currentPage.value).toBe(2);
  });

  it("should disable previous button on the first page", () => {
    wrapper.vm.currentPage.value = 1;
    const prevButton = wrapper.find("#previous-auctions-page-btn");
    expect(prevButton.classes()).toContain("btn-disabled");
  });

  it("should disable next button on the last page", () => {
    wrapper.vm.currentPage.value = 18;
    const nextButton = wrapper.find("#next-auctions-page-btn");
    expect(nextButton.classes()).toContain("btn-disabled");
  });

  it("should display 'no auctions found' when there are no filtered auctions", async () => {
    wrapper.vm.searchQuery.value = "Non-existing auction";
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("Nenhum leilão encontrado");
  });

  it("should navigate to 'create auction' page when button is clicked", async () => {
    await wrapper.setProps({ isSeller: true });
    const routerSpy = vi.spyOn(wrapper.vm.$router, "push");

    const createAuctionButton = wrapper.find("#create-auction-btn");
    await createAuctionButton.trigger("click");

    expect(routerSpy).toHaveBeenCalledWith("/auctions/new");
  });
});
