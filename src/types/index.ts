export interface PortfolioProject {
  _id: string;
  _owner: string;
  _createdDate: string; // ISO 8601 date string
  _updatedDate: string; // ISO 8601 date string

  companyTitle: string;
  location: string;
  description: string;
  image: string; // wix:image://
  screenCaptureVideo: string; // wix:video://
  screenCaptureGif: string; // wix:image://

  categories: string[];

  websiteUrl?: string;
  "link-portfolio-projects-1-companyTitle"?: string;
  "link-portfolio-projects-all"?: string;
}

export type StateCount = Record<string, number>;
