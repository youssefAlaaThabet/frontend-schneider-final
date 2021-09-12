import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Product } from 'src/Models/Product.model';

@Injectable({providedIn: 'root'})
export class InteractionService {
    constructor() { }
    categorySoucrce:ReplaySubject<string>= new ReplaySubject <string>(1);

    ProductSoucrce:ReplaySubject<Product[]>= new ReplaySubject <Product[]>(1);



    sendCategory(category:string){
        this.categorySoucrce.next(category);
    }

    sendProducts(products:Product []){
        this.ProductSoucrce.next(products);
    }
    
    
}