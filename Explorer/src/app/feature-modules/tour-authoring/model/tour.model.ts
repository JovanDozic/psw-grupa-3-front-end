import { Point } from "../../tour-authoring/model/points.model"

export interface Tour{
    id?: number,
    name: string,
    description: string,
    difficult: number,
    tags: string,
    status: string,
    price: number,
    points: Point[],
    authorId: number
}