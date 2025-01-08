export const useUserActionsStore = defineStore("user-actions", () => {
  const userType = ref(UserTypes.Buyer);

  const commonActions = [
    { icon: "mdi-shopping-search", label: "Leilões disponíveis", route: "/auctions" },
    { icon: "mdi-invoice-text-multiple", label: "Meus lances", route: "/bids" },
    { icon: "mdi-forum", label: "Conversas", route: "/chats" },
  ];

  const actionsByUserType = {
    [UserTypes.Buyer]: commonActions,
    [UserTypes.Seller]: [
      { icon: "mdi-shopping", label: "Meus leilões", route: "/my-auctions" },
      ...commonActions,
    ],
    [UserTypes.Curator]: [
      {
        icon: "mdi-clipboard-text-multiple",
        label: "Propostas de leilões",
        route: "/proposals",
      },
    ],
    [UserTypes.Administrator]: [
      {
        icon: "mdi-account-check",
        label: "Avaliação de submissões",
        route: "/submissions",
      },
      {
        icon: "mdi-tag-multiple",
        label: "Tipos de leilões",
        route: "/auction-types",
      },
      {
        icon: "mdi-shape",
        label: "Categorias de itens",
        route: "/item-categories",
      },
    ],
  };

  const userActions = computed(() => {
    return actionsByUserType[userType.value] || [];
  });

  return { userType, userActions };
});
