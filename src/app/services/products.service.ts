import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators'

import { Product, createProductDTO, UpdateProductDTO } from '../models/product.model';

import { environment } from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpClient.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3)
    );
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
