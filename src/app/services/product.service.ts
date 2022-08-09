import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, CartItem } from '../Product';
import { PRODUCTS } from '../mock-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api: string = 'https://fakestoreapi.com/products';
  cartItems: CartItem[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    /* const products = of(PRODUCTS);
    return products; */
    return this.http.get<Product[]>(this.api);
  }

  getProduct(id: Number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  addProductToCart(product: CartItem) {
    console.log(product);
    this.cartItems.push(product);
    //console.log(this.cartItems);
    return localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateProductToCart(product: CartItem) {
    let pIndex = this.cartItems.findIndex((cart) => cart.id === product.id);
    this.cartItems[pIndex] = product;
    return localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeProductFromCart(product: CartItem) {
    let updatedCart = this.cartItems.filter((cart) => cart.id !== product.id);
    return localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }

  getCartProducts(): any {
    let items: any = localStorage.getItem('cartItems')
      ? localStorage.getItem('cartItems')
      : undefined;
    console.log(items);
    return JSON.parse(items);
  }
}
