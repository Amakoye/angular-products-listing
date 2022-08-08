import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../Product';
import { PRODUCTS } from '../mock-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api: string = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    /* const products = of(PRODUCTS);
    return products; */
    return this.http.get<Product[]>(this.api);
  }
}
