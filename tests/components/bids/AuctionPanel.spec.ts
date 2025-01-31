import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionPanel from "~/components/bids/AuctionPanel.vue";
import { VExpansionPanels } from "vuetify/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.mock("~/utils/formatDate", () => ({
  formatDate: vi.fn().mockResolvedValue(""),
}));

describe("AuctionPanel", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended({
      props: {
        auction: {
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
        isOpened: true,
      },
      template: `
        <v-expansion-panels>
            <AuctionPanel :auction="{}" :isOpened="true" />
        </v-expansion-panels>
    `,
      components: {
        VExpansionPanels,
        AuctionPanel,
      },
    });
  });

  it("should render the AuctionPanel component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
