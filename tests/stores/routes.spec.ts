import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useRoutesStore } from "@/stores/routes";
import { UserTypes } from "@/stores/enum";

const globalRoutes = [{ label: "Início", to: "/", menu: false }];

const sharedRoutes = [
  {
    icon: "mdi-shopping-search",
    label: "Leilões disponíveis",
    to: "/auctions",
    menu: true,
  },
  { label: "Detalhes de leilão", to: "/auctions/[id]", menu: false },
  {
    icon: "mdi-invoice-text-multiple",
    label: "Meus lances",
    to: "/bids",
    menu: true,
  },
  { icon: "mdi-forum", label: "Conversas", to: "/chats", menu: true },
];

const sellerRoutes = [
  {
    icon: "mdi-shopping",
    label: "Meus leilões",
    to: "/my-auctions",
    menu: true,
  },
];

const curatorRoutes = [
  {
    icon: "mdi-clipboard-text-multiple",
    label: "Propostas de leilões",
    to: "/proposals",
    menu: true,
  },
];

const adminRoutes = [
  {
    icon: "mdi-account-check",
    label: "Avaliação de submissões",
    to: "/submissions",
    menu: true,
  },
  {
    icon: "mdi-tag-multiple",
    label: "Tipos de leilões",
    to: "/auction-types",
    menu: true,
  },
  {
    icon: "mdi-shape",
    label: "Categorias de itens",
    to: "/item-categories",
    menu: true,
  },
];

describe("useRoutesStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should return the correct routes for Buyer", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Buyer;

    expect(store.userRoutes).toEqual([...globalRoutes, ...sharedRoutes]);
  });

  it("should return the correct routes for Seller", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Seller;

    expect(store.userRoutes).toEqual([
      ...globalRoutes,
      ...sellerRoutes,
      ...sharedRoutes,
    ]);
  });

  it("should return the correct routes for Curator", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Curator;

    expect(store.userRoutes).toEqual([...globalRoutes, ...curatorRoutes]);
  });

  it("should return the correct routes for Administrator", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Administrator;

    expect(store.userRoutes).toEqual([...globalRoutes, ...adminRoutes]);
  });

  it("should return menu routes for Buyer", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Buyer;

    const menuRoutes = store.menuRoutes;
    expect(menuRoutes).toEqual([
      {
        icon: "mdi-shopping-search",
        label: "Leilões disponíveis",
        to: "/auctions",
        menu: true,
      },
      {
        icon: "mdi-invoice-text-multiple",
        label: "Meus lances",
        to: "/bids",
        menu: true,
      },
      { icon: "mdi-forum", label: "Conversas", to: "/chats", menu: true },
    ]);
  });

  it("should return menu routes for Seller", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Seller;

    const menuRoutes = store.menuRoutes;
    expect(menuRoutes).toEqual([
      {
        icon: "mdi-shopping",
        label: "Meus leilões",
        to: "/my-auctions",
        menu: true,
      },
      {
        icon: "mdi-shopping-search",
        label: "Leilões disponíveis",
        to: "/auctions",
        menu: true,
      },
      {
        icon: "mdi-invoice-text-multiple",
        label: "Meus lances",
        to: "/bids",
        menu: true,
      },
      { icon: "mdi-forum", label: "Conversas", to: "/chats", menu: true },
    ]);
  });

  it("should return menu routes for Curator", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Curator;

    const menuRoutes = store.menuRoutes;
    expect(menuRoutes).toEqual([
      {
        icon: "mdi-clipboard-text-multiple",
        label: "Propostas de leilões",
        to: "/proposals",
        menu: true,
      },
    ]);
  });

  it("should return menu routes for Administrator", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Administrator;

    const menuRoutes = store.menuRoutes;
    expect(menuRoutes).toEqual([
      {
        icon: "mdi-account-check",
        label: "Avaliação de submissões",
        to: "/submissions",
        menu: true,
      },
      {
        icon: "mdi-tag-multiple",
        label: "Tipos de leilões",
        to: "/auction-types",
        menu: true,
      },
      {
        icon: "mdi-shape",
        label: "Categorias de itens",
        to: "/item-categories",
        menu: true,
      },
    ]);
  });

  it("should correctly match dynamic route for Buyer", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Buyer;

    const currentRoute = "/auctions/123";
    const matchedRoute = store.findCurrentRoute(currentRoute);
    expect(matchedRoute).toEqual({
      label: "Detalhes de leilão",
      to: "/auctions/[id]",
      menu: false,
    });
  });

  it("should return null for unmatched dynamic route", () => {
    const store = useRoutesStore();
    store.userType = UserTypes.Buyer;

    const currentRoute = "/nonexistent-route";
    const matchedRoute = store.findCurrentRoute(currentRoute);
    expect(matchedRoute).toBeNull();
  });
});
