export interface ReviewModel {
  customerName: string;
  rating: number;
  reviewText: string;
  city?: string;
  serviceType?: string;
  source?: string;
  isPublished: boolean;
}
