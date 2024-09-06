import { ApplicationStatus } from "../models/ApplicationStatus";

export const getStatusText = (status) => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return "En attente";
      break;
    case ApplicationStatus.ACCEPTED:
      return "Accepté";
      break;
    case ApplicationStatus.INTERVIEW:
      return "Entretien";
    case ApplicationStatus.REJECTED:
      return "Rejeté";
    case ApplicationStatus.OFFERED:
      return "Offert";
    case "all":
      return "Tout";
    default:
      return "all";
  }
};
