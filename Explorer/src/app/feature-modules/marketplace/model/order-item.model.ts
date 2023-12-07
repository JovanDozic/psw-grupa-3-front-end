export interface OrderItem {
    idType: number;
    name: string;
    price: number;
    image: string;
   couponCode: string;
    type: string;
}

export enum OrderItemType {
    bundle = 'Bundle',
    singleTour = 'SingleTour'

}