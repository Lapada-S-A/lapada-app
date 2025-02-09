import type { Route, RoutesByUserType } from "~/interfaces/route";

export const useRoutesStore = defineStore("routes", () => {
  const userType = ref<UserTypes>(UserTypes.Seller);

  const globalRoutes: Route[] = [
    {
      label: "Início",
      to: "/",
      menu: false,
    },
  ];

  const sharedRoutes: Route[] = [
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

  const routesByUserType: RoutesByUserType = {
    [UserTypes.Buyer]: [...globalRoutes, ...sharedRoutes],
    [UserTypes.Seller]: [
      ...globalRoutes,
      {
        icon: "mdi-shopping",
        label: "Meus leilões",
        to: "/auctions/my-auctions",
        menu: true,
      },
      {
        icon: "mdi-shopping",
        label: "Criar leilão",
        to: "/auctions/new",
        menu: false,
      },
      ...sharedRoutes,
    ],
    [UserTypes.Curator]: [
      ...globalRoutes,
      {
        icon: "mdi-clipboard-text-multiple",
        label: "Propostas de leilões",
        to: "/proposals",
        menu: true,
      },
    ],
    [UserTypes.Administrator]: [
      ...globalRoutes,
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
    ],
  };

  const userRoutes = computed(() => routesByUserType[userType.value] || []);

  const menuRoutes = computed(() =>
    userRoutes.value.filter((route: Route) => route.menu)
  );

  const findCurrentRoute = (currentPath: string) => {
    return (
      userRoutes.value.find((route: Route) => {
        const dynamicPattern = new RegExp(
          `^${route.to.replace(/\[.+?\]/g, "([^/]+)")}$`
        );
        return dynamicPattern.test(currentPath);
      }) || null
    );
  };

  return { userType, userRoutes, menuRoutes, findCurrentRoute };
});
