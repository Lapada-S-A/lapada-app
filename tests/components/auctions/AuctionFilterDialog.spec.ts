import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionFilterDialog from "~/components/auctions/AuctionFilterDialog.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionFilterDialog", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionFilterDialog, {});
  });

  it("should render the AuctionFilterDialog component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should open the modal when clicking the activator button", async () => {
    const button = wrapper.find("button");
    await button.trigger("click");
    
    expect(wrapper.vm.isOpen).toBeTruthy();
  });

  
  it("should update filters when setting values", async () => {
    wrapper.vm.filters = {
      category: "Eletrônicos",
      auctionType: "Comum",
      status: "Aberto",
      minBid: 100,
      maxBid: 500,
      endDate: "2023-12-31",
    };
    
    expect(wrapper.vm.filters).toEqual({
      category: "Eletrônicos",
      auctionType: "Comum",
      status: "Aberto",
      minBid: 100,
      maxBid: 500,
      endDate: "2023-12-31",
    });
  });

  it("should clear filters when calling clearFilters method", async () => {
    wrapper.vm.filters.value = {
        category: "Eletrônicos",
        auctionType: "Comum",
        status: "Aberto",
        minBid: 100,
        maxBid: 500,
        endDate: "2023-12-31",
      };
      
    wrapper.vm.clearFilters();
    await nextTick();

    expect(wrapper.emitted("clear-filters")[0]).toBeTruthy();
    expect(wrapper.vm.filters.value).toEqual({
      categoryId: null,
      typeId: null,
      status: null,
      minBid: null,
      maxBid: null,
      endDate: null,
    });
  });

  it("should emit 'apply-filter' when calling applyFilter method", async () => {
    wrapper.vm.applyFilters();
    await nextTick();
    expect(wrapper.emitted("apply-filters")[0]).toBeTruthy();
  });

  it("should format date correctly", async () => {
    const formattedDate = wrapper.vm.formatDate("Wed Jan 29 2025 00:00:00 GMT-0300");
    await nextTick();
    expect(formattedDate).toBe("29/01/2025");
  });

  it("should clear the date when calling clearDate method", async () => {
    wrapper.vm.filters.value.endDate = "2023-12-31";
    wrapper.vm.clearDate();
    await nextTick();
    expect(wrapper.vm.filters.value.endDate).toBeNull();
  });
});
