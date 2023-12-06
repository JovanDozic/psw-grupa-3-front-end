import { Component } from '@angular/core';
import { ShoppingCart } from '../model/shopping-cart.model';
import { MarketplaceService } from '../marketplace.service';
import { OrderItem } from '../model/order-item.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  shoppingCart: ShoppingCart;
  user: User;
  sum: number;

  constructor(private service: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getShoppingCart();
    })
  }

  getShoppingCart() {
    this.service.getCartByUserId(this.user.id).subscribe({
      next: (result: ShoppingCart) => {
        this.shoppingCart = result;
        this.getSum();
      }
    })
  }

  purchaseFromCart() {
    this.service.purchaseFromCart(this.shoppingCart).subscribe({
      next: result => {
        let copiedCart = Object.assign({}, this.shoppingCart);
        copiedCart.items = [];
        this.service.updateCart(copiedCart).subscribe({
          next: result => {
            this.getShoppingCart();
          }
        })
      }
    })
  }

  onRemoveClicked(t: OrderItem): void {
    let copiedCart = Object.assign({}, this.shoppingCart);
    let i = copiedCart.items.findIndex((x: OrderItem) => x.idTour === t.idTour);
    copiedCart.items.splice(i, 1);

    this.service.updateCart(copiedCart).subscribe({
      next: (result: ShoppingCart) => {
        this.shoppingCart = result;
        this.getSum();
        alert('Successfully removed from cart!');
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getSum(): void {
    this.sum = 0;
    for (let o of this.shoppingCart.items) {
      this.sum += o.price
    }
  }
}
