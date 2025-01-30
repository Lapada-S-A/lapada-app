import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AuctionSearch from "@/components/auctions/AuctionSearch.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionSearch", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(AuctionSearch, {});
  });

  it("should render the AuctionSearch component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should update the searchQuery model when typing in the search field", async () => {
    const input = wrapper.find("input#auctions-search-textfield");
    await input.setValue("Sculpture");

    expect(wrapper.vm.searchQuery.value).toBe("Sculpture");
  });

  it("should emit 'update:searchQuery' event when the search field is updated", async () => {
    const input = wrapper.find("input#auctions-search-textfield");
    await input.setValue("Classic Car");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:searchQuery")).toBeTruthy();
    expect(wrapper.emitted("update:searchQuery")![0]).toEqual(["Classic Car"]);
  });

  it("should render the applied filters correctly", () => {
    const chips = wrapper.findAll(".v-chip");

    expect(chips.length).toBe(2);
    expect(chips[0].text()).toContain("Relíquia");
    expect(chips[1].text()).toContain("Automóvel");
  });

  it("should display the search icon and filter button", () => {
    const searchIcon = wrapper.find("i.mdi-magnify");
    const filterButton = wrapper.find("i.mdi-filter-variant");

    expect(searchIcon.exists()).toBeTruthy();
    expect(filterButton.exists()).toBeTruthy();
  });
});
