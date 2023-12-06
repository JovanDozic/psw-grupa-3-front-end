import { Tour } from "./tour.model";

export interface Bundle {
    id: number,
    name: string,
    status: string,
    price: number,
    tours: Tour[]
}