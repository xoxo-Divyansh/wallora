export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  startingPrice?: number;
  timelineText?: string;
  isActive: boolean;
  sortOrder: number;
}
