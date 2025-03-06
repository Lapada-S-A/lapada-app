import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

// Mock da store de tipos
vi.mock("~/stores/types", () => ({
  useTypesStore: vi.fn(() => ({
    getTypeById: vi.fn().mockResolvedValue({ id: 1, name: "Type 1" }),
  })),
}));

describe("AuctionCard", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionCard, {
      props: {
        auction: {
          created_date: "20-12-2024-10-00-00",
          end_date: "21-12-2024-10-00-00",
          id: 1,
          initial_value: 100.0,
          min_increment: 5.0,
          seller_id: 1,
          status: 2,
          title: "Auction for Item XYZA",
          highest_bid: 1000,
          type_id: 1,
          description: "Description",
          categories: [1],
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the AuctionCard component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display auction title", () => {
    const title = wrapper.find(".title-truncate");
    expect(title.text()).toBe("Auction for Item XYZA");
  });

  it("should call 'sentToDetails' when the details button is clicked", async () => {
    const routerSpy = vi.spyOn(wrapper.vm.$router, "push");
    const detailsButton = wrapper.find("#send-to-details-btn");
    await detailsButton.trigger("click");
    expect(routerSpy).toHaveBeenCalledWith("/auctions/1");
  });

  it("should show the status if showStatus is true", async () => {
    await wrapper.setProps({ showStatus: true });
    const statusText = wrapper.find(".status");
    expect(statusText.exists()).toBeTruthy();
  });

  it("should not show the status if showStatus is false", async () => {
    await wrapper.setProps({ showStatus: false });
    const statusText = wrapper.find(".status");
    expect(statusText.exists()).toBeFalsy();
  });

  it("should display remaining time correctly", async () => {
    await wrapper.vm.$nextTick();
    const bidText = wrapper.find(".time");
    expect(bidText.text()).toBe("1d");
  });

  it("should display highest bid correctly", async () => {
    await wrapper.vm.$nextTick();
    const bidText = wrapper.find(".bid");
    expect(bidText.text()).toContain("1.000,00");
  });
});
