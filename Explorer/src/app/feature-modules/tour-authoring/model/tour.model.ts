import { Guide } from "./guide.model";
import { Point } from "./points.model";
import { RequiredTime } from "./requiredTime.model";

export interface Tour {
    id: number,
    name: string,
    description: string,
    difficult: number,
    tags: any,
    status: string,
    price: number,
    guide: Guide,
    length: number,
    publishTime: string,
    arhiveTime: string,
    points: Point[],
    requiredTime: RequiredTime,
}