export interface Review {
    id: number;
    buyer_id: number;
    seller_id: number;
    comment: string;
    rate: number;
    created_at: string;
    updated_at: string;
  }
  
export interface ReviewRequest {
    rate: number;
    comment: string;
    buyer_id: number;
    seller_id: number;
} 

export interface AverageRating{
    average_rating: string;
    seller_id?: number;
    message?: string;
}