export interface TourReview{
    id?: number,
    rating: number,
    comment: string,
    touristId: number,
    tourDate: Date,
    creationDate: Date,
    images: string[],
    tourId: number
}