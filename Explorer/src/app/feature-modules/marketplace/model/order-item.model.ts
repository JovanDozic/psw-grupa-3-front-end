export interface OrderItem {
    idType: number;
    name: string;
    price: number;
    image: string;
    type: string;
}

export enum OrderItemType {
    bundle = 'Bundle',
    singleTour = 'SingleTour'
}