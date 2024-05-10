import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  get() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.ApiUrl + '/api/product')
  }

  post(product: any) {
    const form = new FormData();
    for(let prop in product) {
      form.append(prop, product[prop]);
    }
    return this.httpClient.post(environment.ApiUrl + '/api/product', form)
  }
}
