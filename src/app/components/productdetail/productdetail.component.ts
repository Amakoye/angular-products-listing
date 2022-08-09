import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  productId?: Number;
  product?: Product;
  alertState: boolean = false;
  alertText?: string;
  addToCart = faCartPlus;
  addToCartText: string = 'Add to Cart';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(this.productId);
  }

  getProduct(id: Number): void {
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  AddToCart(product: Product) {
    let addToCartProduct = { ...product, quantity: 1 };
    this.productService.addProductToCart(addToCartProduct);

    this.alertState = !this.alertState;
    setTimeout(() => {
      this.alertState = false;
    }, 3000);
    this.alertText = 'Product added to cart';
  }
}
