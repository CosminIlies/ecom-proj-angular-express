import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   constructor(private http: HttpClient) {}

    getProducts(id:string){
      return this.http.get<ProductModel>(`http://localhost:3000/api/products/${id}`);
    }

    addProduct(products:ProductModel){
      return this.http.post<ProductModel>('http://localhost:3000/api/products', products);
    }
}
