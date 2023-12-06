export interface OrderItem {
    idType: number;
    name: string;
    price: number;
    image: string;
    type: OrderItemType;
}

export enum OrderItemType {
    bundle = 'Bundle',
    singleTour = 'SingleTour'
}