import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionPanelText from "~/components/bids/AuctionPanelText.vue";
import { VExpansionPanel, VExpansionPanels } from "vuetify/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AuctionPanelText", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended({
      props: {
        auction: {
          id: 1,
          title: "Pintura de Paisagem do Século XIX",
          type: "Leilão invertido",
          startDate: "30/01/2024",
          remainingTime: 97645,
          highestBid: 2800000000,
        },
        isOpened: true,
      },
      template: `
        <v-expansion-panels>
            <v-expansion-panel>
                <AuctionPanelText :auction="{}" />
            </v-expansion-panel>
        </v-expansion-panels>
    `,
      components: {
        VExpansionPanel,
        VExpansionPanels,
        AuctionPanelText,
      },
    });
  });

  it("should render the AuctionPanelText component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
