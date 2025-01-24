<template>
  <AuctionItemDetails
    :title="auctionData.title"
    :category="auctionData.category"
    :date="auctionData.date"
    :current-bid="auctionData.currentBid"
    :min-increment="auctionData.minIncrement"
    :remaining-time="auctionData.remainingTime"
    :description="auctionData.description"
    :images="auctionData.images"
    :bids="auctionData.bids"
    :show-back-button="true"
    @on-back-click="navigateBack"
  />
</template>

<script setup lang="ts">
import AuctionItemDetails from "@/components/layouts/default/auction/ItemDetails.vue";

const navigateBack = () => {
  console.log("Voltar ao catálogo");
};

const auctionData = {
  title: "Automóvel Clássico Ford Mustang 1965",
  category: "Automóvel, Relíquia",
  date: "21/11/2024",
  currentBid: "R$ 500.000,00",
  minIncrement: "R$ 5.000,00",
  remainingTime: "3 dias 14 horas 26 minutos 58 segundos",
  description: `Apresentamos um icônico Ford Mustang 1965, um verdadeiro símbolo
    da era de ouro dos muscle cars americanos. Este exemplar foi
    completamente restaurado com um nível de precisão que respeita
    cada detalhe do modelo original, garantindo que ele esteja em
    excelente estado tanto estético quanto mecânico. Equipado com um
    potente motor V8 289, ele oferece uma experiência de direção
    robusta e emocionante, característica que solidificou a reputação
    do Mustang como um carro de performance. A pintura original
    vermelha brilha intensamente, graças a um processo de restauração
    meticuloso que realça as linhas clássicas e elegantes do carro. As
    rodas de liga leve cromadas complementam o visual icônico,
    tornando este Mustang uma peça de colecionador.`,
  images: [
    "https://cdn.motor1.com/images/mgl/jlw7Ne/s1/bmw-m5-2024-im-test.jpg",
    "https://cdn.motor1.com/images/mgl/jlwrMo/s1/novo-bmw-serie-3-2027---projecao.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/03/BMW-iX1eDrive20-xLine-e1710447790402.jpeg",
    "https://i.ytimg.com/vi/B3sh4cjPs88/maxresdefault.jpg",
  ],
  bids: [
    { user: "Pablo Estrela", date: "29/11/2024", value: "R$ 500.000,00" },
    { user: "Juan Farias", date: "27/11/2024", value: "R$ 455.000,00" },
    { user: "Pablo Estrela", date: "26/11/2024", value: "R$ 450.000,00" },
  ],
};
</script>
