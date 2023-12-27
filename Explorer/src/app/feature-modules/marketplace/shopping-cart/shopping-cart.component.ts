import { Component } from '@angular/core';
import { ShoppingCart } from '../model/shopping-cart.model';
import { MarketplaceService } from '../marketplace.service';
import { OrderItem } from '../model/order-item.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Wallet } from '../model/wallet.model';

@Component({
  selector: 'xp-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  shoppingCart: ShoppingCart;
  user: User;
  sum: number;
  wallet: Wallet;

  constructor(private service: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getShoppingCart();
      this.getWallet();
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

  purchaseFromCartUsingAC() {
    if(this.wallet.coins < this.sum){
      alert("You don't have enouth AC to purchase everything from the cart! Please remove some items and try again...")
      return
    } else {

    this.wallet = {
      id: this.wallet.id,
      userId: this.wallet.userId,
      coins: Math.floor(this.wallet.coins - this.sum)
    }

    this.purchaseFromCart()
    this.updateWallet()
    }
  }

  updateWallet(){
    this.service.updateWallet(this.wallet).subscribe({
      next: (result: Wallet) => {
        this.wallet = result
      },
      error: error => {
        console.error('Greška pri ažuriranju novčanika:', error);
      }
    })
  }

  onRemoveClicked(t: OrderItem): void {
    let copiedCart = Object.assign({}, this.shoppingCart);
    let i = copiedCart.items.findIndex((x: OrderItem) => x.idType === t.idType);
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

  getWallet() : void {
    this.service.getWalletByUserId(this.user.id).subscribe({
      next: (result: Wallet) => {
        this.wallet = result;
      }
    })
  }
}
