import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'

import { Product, createProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpClient.get<Product[]>(this.apiUrl, {params});
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductbyPage(limit: number, offset: number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: {limit,offset}
    });
  }

  create(data: createProductDTO) {
    return this.httpClient.post<Product>(this.apiUrl,data);
  }

  update(id: string,data: UpdateProductDTO){
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`,data);
  }

  delete(id: string){
    return this.httpClient.delete<Product>(`${this.apiUrl}/${id}`);
  }

}
