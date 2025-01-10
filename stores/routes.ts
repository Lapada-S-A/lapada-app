export const useRoutesStore = defineStore("routes", () => {
  const userType = ref<UserTypes>(UserTypes.Buyer);

  const globalRoutes: Route[] = [
    {
      label: "Início",
      route: "/",
      menu: false,
    },
  ];

  const sharedRoutes: Route[] = [
    {
      icon: "mdi-shopping-search",
      label: "Leilões disponíveis",
      route: "/auctions",
      menu: true,
    },
    { label: "Detalhes de leilão", route: "/auctions/[id]", menu: false },
    {
      icon: "mdi-invoice-text-multiple",
      label: "Meus lances",
      route: "/bids",
      menu: true,
    },
    { icon: "mdi-forum", label: "Conversas", route: "/chats", menu: true },
  ];

  const routesByUserType: RoutesByUserType = {
    [UserTypes.Buyer]: [...globalRoutes, ...sharedRoutes],
    [UserTypes.Seller]: [
      ...globalRoutes,
      {
        icon: "mdi-shopping",
        label: "Meus leilões",
        route: "/my-auctions",
        menu: true,
      },
      ...sharedRoutes,
    ],
    [UserTypes.Curator]: [
      ...globalRoutes,
      {
        icon: "mdi-clipboard-text-multiple",
        label: "Propostas de leilões",
        route: "/proposals",
        menu: true,
      },
    ],
    [UserTypes.Administrator]: [
      ...globalRoutes,
      {
        icon: "mdi-account-check",
        label: "Avaliação de submissões",
        route: "/submissions",
        menu: true,
      },
      {
        icon: "mdi-tag-multiple",
        label: "Tipos de leilões",
        route: "/auction-types",
        menu: true,
      },
      {
        icon: "mdi-shape",
        label: "Categorias de itens",
        route: "/item-categories",
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
          `^${route.route.replace(/\[.+?\]/g, "([^/]+)")}$`
        );
        return dynamicPattern.test(currentPath);
      }) || null
    );
  };

  return { userType, userRoutes, menuRoutes, findCurrentRoute };
});
