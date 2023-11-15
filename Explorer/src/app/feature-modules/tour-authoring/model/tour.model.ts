import { Point } from "../../tour-authoring/model/points.model"
import { Guide } from "./guide.model";
import { RequiredTime } from "./requiredTime.model";
import { TourReview } from "./tourReview.model";

export interface Tour {
    id: number,
    name: string,
    description: string,
    difficult: number,
    tags: any,
    status: string,
    price: number,
    points: Point[],
    authorId: number
    guide: Guide,
    length: number,
    publishTime: string,
    arhiveTime: string,
    requiredTime: RequiredTime,
    reviews: TourReview[],
    authorId: number,
}