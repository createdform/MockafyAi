import {Product} from '@/app/ProductList/types';

export type Cart = {
   id: number;
   userId: number;
   date: string;
   products: Product[];
}
