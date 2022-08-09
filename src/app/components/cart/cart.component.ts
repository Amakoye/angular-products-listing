import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/Product';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  alertState: boolean = false;
  alertText?: string;
  total = 0;
  deleteIcon = faTimes;
  increment = faPlus;
  decrement = faMinus;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartItems();
    this.calculateSubTotal();
  }

  getCartItems(): CartItem[] {
    this.cartItems = this.productService.getCartProducts();
    return this.cartItems;
  }

  incrementQuantity(itemToIncrement: CartItem) {
    let item = this.cartItems.find(
      (cartItem) => cartItem.id === itemToIncrement.id
    );

    if (item) {
      item.quantity++;
      this.total = Number((this.total + item.price).toFixed(2));
      this.productService.updateProductToCart(item);
    }

    //console.log(`${item?.title} index = ${itemIndex}`);
    //this.calculateSubTotal();
  }

  decrementQuantity(itemToIncrement: CartItem) {
    let item = this.cartItems.find(
      (cartItem) => cartItem.id === itemToIncrement.id
    );

    if (item) {
      item.quantity--;
      this.total = Number((this.total - item.price).toFixed(2));
      this.productService.updateProductToCart(item);
    }
  }

  deleteCartItem(itemToDelete: CartItem) {
    this.cartItems = this.cartItems.filter(
      (cart) => cart.id !== itemToDelete.id
    );
    this.productService.removeProductFromCart(itemToDelete);

    this.alertState = !this.alertState;
    setTimeout(() => {
      this.alertState = false;
    }, 3000);
    this.alertText = 'Item removed successfully';
  }

  calculateSubTotal() {
    for (let i = 0; i < this.cartItems.length; i++) {
      let subTotal = this.cartItems[i].price * this.cartItems[i].quantity;
      this.total = Number((this.total + subTotal).toFixed(2));
    }

    return this.total;
  }
}
