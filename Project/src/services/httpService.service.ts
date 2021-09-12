import { Cart } from './../Models/Cart.model';
import { Shipping } from './../Models/Shipping.models';
import { User } from './../Models/User.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './../Models/Product.model';
import { R3NgModuleMetadata } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class HttpService {
    baseUrl="http://localhost:60303";
    constructor(private httpClient:HttpClient) { }

    getProducts(url:string){
       return this.httpClient.get<Product[]>(this.baseUrl+url,{
            observe:'response'
        })
    }
    postProduct(url:string,product:Product){
        return this.httpClient.post<Product>(this.baseUrl+url,product,{
            observe:'response'})
    }
    postUser(url:string,user:User){
        return this.httpClient.post<User>(this.baseUrl+url,user,{
            observe:'response'})
    }
    postShipping(url:string,shipping:Shipping){
        return this.httpClient.post<Shipping>(this.baseUrl+url,shipping,{
            observe:'response'})
    }
    getCart(url:string){
        return this.httpClient.get<Cart[]>(this.baseUrl+url,{
             observe:'response'
         })
     }   
     postCart(url:string,cart:Cart){
         return this.httpClient.post<Cart>(this.baseUrl+url,cart,{
             observe:'response'})
     }
     putCart(url:string,cart:Cart){
         return this.httpClient.put<Cart>(this.baseUrl+url,cart,{
            observe:'response'})
     }
     deletecart(url:string,id:number){
         return this.httpClient.delete<Cart>(this.baseUrl+url + `${id}`,{
            observe:'response'})
     }
}