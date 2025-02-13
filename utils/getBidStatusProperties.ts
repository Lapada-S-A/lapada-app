import { BidStatus } from "~/stores/enum";

export function getBidStatusProperties(statusId: BidStatus) {
  switch (statusId) {
    case BidStatus.ACTIVE:
      return { name: "Ativo", color: "success" };
    case BidStatus.EXPIRED:
      return { name: "Vencido", color: "error" };
    case BidStatus.WINNER:
      return { name: "Vencedor", color: "primary" };
  }
}
