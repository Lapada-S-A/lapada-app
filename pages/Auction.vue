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
  description: `Apresentamos um icônico Ford Mustang 1965, um verdadeiro símbolo da era de ouro dos muscle cars americanos. Este exemplar não é apenas um carro, mas uma verdadeira relíquia histórica que foi completamente restaurada com um nível de precisão impressionante, respeitando rigorosamente cada detalhe do modelo original. O trabalho de restauração foi feito com extrema dedicação, garantindo que este Mustang esteja em um estado impecável, tanto estético quanto mecânico, pronto para encantar os entusiastas de carros clássicos e os apreciadores de desempenho.
Equipado com um potente motor V8 289, este Mustang oferece uma experiência de direção robusta e emocionante, que é a essência do que fez o modelo se tornar uma lenda entre os carros de performance. Sua aceleração enérgica e o ronco inconfundível do motor fazem qualquer entusiasta sentir a verdadeira emoção de estar no comando de um carro com tanta história. A suspensão foi cuidadosamente ajustada, proporcionando uma dirigibilidade precisa e confortável, sem perder a essência de um muscle car puro.
A pintura original vermelha, restaurada com um processo meticuloso, brilha intensamente sob a luz, realçando as linhas clássicas e elegantes que definem o design atemporal deste carro. O brilho da pintura é acompanhado por um polido impecável, que garante um visual vibrante e cativante, digno de um carro de colecionador. As rodas de liga leve cromadas, de excelente acabamento, complementam o visual icônico do Mustang, conferindo um toque de sofisticação e esportividade.
Este Mustang 1965 não é apenas um carro, mas uma verdadeira peça de colecionador, ideal para quem busca um exemplar raro e em perfeitas condições de conservação. Com um histórico de cuidados detalhados e um visual que não passa despercebido, este modelo representa a fusão perfeita entre tradição, desempenho e estilo, fazendo dele uma escolha incomparável para qualquer fã de carros clássicos.`,
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
