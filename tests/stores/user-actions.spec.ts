import { describe, it, expect, beforeEach, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useUserActionsStore } from "@/stores/user-actions";
import type { UserTypes } from "@/stores/enum";

enum mockedUserTypes {
  Buyer = 1,
  Seller = 2,
}

const buyerActions = [
  {
    icon: "mdi-shopping-search",
    label: "Leilões",
    route: "/auctions",
  },
];

const sellerActions = [
  { icon: "mdi-shopping", label: "Meus leilões", route: "/my-auctions" },
];

vi.mock("@/stores/enum", () => ({
  UserTypes: mockedUserTypes,
}));

vi.mock("@/stores/user-actions", () => {
  return {
    useUserActionsStore: vi.fn(() => ({
      userType: mockedUserTypes.Buyer, 
      actionsByUserType: {
        [mockedUserTypes.Buyer]: buyerActions,
        [mockedUserTypes.Seller]: sellerActions,
      },
      get userActions() {
        return this.actionsByUserType[this.userType] || [];
      },
    })),
  };
});

describe("useUserActionsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should return the correct actions for Buyer", () => {
    const store = useUserActionsStore();
    store.userType = mockedUserTypes.Buyer as unknown as UserTypes;
    expect(store.userActions).toEqual(buyerActions);
  });

  it("should return the correct actions for Seller", () => {
    const store = useUserActionsStore();
    store.userType = mockedUserTypes.Seller as unknown as UserTypes;
    expect(store.userActions).toEqual(sellerActions);
  });

  it("should update actions when userType changes", () => {
    const store = useUserActionsStore();
    store.userType = mockedUserTypes.Seller as unknown as UserTypes;
    expect(store.userActions).toEqual(sellerActions);

    store.userType = mockedUserTypes.Buyer as unknown as UserTypes;
    expect(store.userActions).toEqual(buyerActions);
  });

  it("should return an empty array for an unknown userType", () => {
    const store = useUserActionsStore();
    store.userType = "Unknown" as unknown as UserTypes;
    expect(store.userActions).toEqual([]);
  });
});
