import { Product } from './Product.model';
export interface Cart{
    id:number;
    userId:number;
    productId:number;
    number?:number;
}
