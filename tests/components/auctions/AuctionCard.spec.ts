import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AuctionCard from "@/components/auctions/AuctionCard.vue";
import { AuctionStatus } from "~/stores/enum";

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
    wrapper = await mountSuspended(AuctionCard, {
      props: {
        auction: {
          id: 1,
          title: "Relógio de Ouro Antigo",
          type_id: 2,
          created_date: "15-01-2025-12-00-00",
          end_date: "16-01-2025-12-00-00",
          initial_value: 500000,
          item_id: 123,
          min_increment: 1000,
          seller_id: 456,
          status: AuctionStatus.ACTIVE,
        },
      },
    });
  });

  it("should render the AuctionCard component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
