import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/Product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem?: CartItem;
  @Input() deleteIcon: any;
  @Input() incrementIcon: any;
  @Input() decrementIcon: any;
  @Output() onIncrementQuantity = new EventEmitter();
  @Output() onDecrementQuantity = new EventEmitter();
  @Output() onRemoveFromCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  incrementQuantity(): void {
    //console.log(111);
    this.onIncrementQuantity.emit();
  }

  decrementQuantity(): void {
    this.onDecrementQuantity.emit();
  }

  removeFromCart(): void {
    this.onRemoveFromCart.emit();
  }
}
