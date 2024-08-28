export interface OfferModel {
  id?: string;
  jobTitle: string;
  location: string;
  description: string;
  employmentType: 1 | 2; // Type d'emploi: 1 = Temps plein, 2 = Temps partiel
  workLocationType: 1 | 2 | 3; // Localisation du travail: 1 = Télétravail, 2 = Présentiel, 3 = Hybride
  salary: number;
  isSalaryNegotiable: boolean;
  maxCandidates: number;
  requirements: string;
  responsabilities: string;
  applicationDeadline: string;
  recruiterId: string;
  createdAt?: Date | string;
}
