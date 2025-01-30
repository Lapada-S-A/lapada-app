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

const mockAuctions = [
  {
    title: "Pintura de Paisagem do Século XIX",
    type: "Leilão invertido",
    remainingTime: 97645,
    highestBid: 2800000000,
  },
  {
    title: "Escultura de Mármore",
    type: "Leilão tradicional",
    remainingTime: 2456,
    highestBid: 0,
  },
  {
    title: "Relógio de Ouro Antigo",
    type: "Leilão por proximidade",
    remainingTime: 34567,
    highestBid: 500000,
  },
  {
    title: "Carro Clássico",
    type: "Leilão invertido",
    remainingTime: 0,
    highestBid: 12000,
  },
];

vi.stubGlobal("auctions", mockAuctions);

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
    wrapper.vm.searchQuery.value = "Escultura de Mármore";
    await wrapper.vm.$nextTick();

    const auctionCards = wrapper.findAllComponents(AuctionCard);
    expect(auctionCards.length).toBeGreaterThan(0);
  });

  it("should correctly filter auctions based on search query", async () => {
    wrapper.vm.searchQuery.value = "Pintura";
    await wrapper.vm.$nextTick();

    const filteredAuctions = wrapper.vm.filteredAuctions;
    expect(filteredAuctions.length).toBe(1);
    expect(filteredAuctions[0].title).toBe("Pintura de Paisagem do Século XIX");
  });
});
