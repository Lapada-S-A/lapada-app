import { AuctionStatus } from "~/stores/enum";

export function getAuctionStatusProperties(statusId: AuctionStatus) {
  switch (statusId) {
    case AuctionStatus.PENDING:
      return { name: "Pendente", color: "warning" };
    case AuctionStatus.OPEN:
      return { name: "Aberto", color: "success" };
    case AuctionStatus.FINISHED:
      return { name: "Encerrado", color: "font-100" };
    case AuctionStatus.REJECTED:
      return { name: "Rejeitado", color: "error" };
    case AuctionStatus.CANCELED:
      return { name: "Cancelado", color: "error" };
  }
}
