import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('Producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas permitido ingresar');
        }
        return throwError('ups algo salio mal');
      })
    );
  }

  getProductbyPage(limit: number, offset: number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: {limit,offset}
    })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
    ;
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
