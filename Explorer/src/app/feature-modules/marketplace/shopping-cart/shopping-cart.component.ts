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
  constructor(private service: MarketplaceService, private authService: AuthService) { }
  ngOnInit(): void {
    this.getSum();
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  } 

  user: User

  orderItem1: OrderItem = {
    idTour: 1,
    name: 'Tura 1',
    price: 50.00
  };
  
  orderItem2: OrderItem = {
    idTour: 2,
    name: 'Tura 2',
    price: 75.00
  };
  
  // Kreirajte objekat ShoppingCart sa listom OrderItem
  shoppingCart: ShoppingCart = {
    items: [this.orderItem1, this.orderItem2],
    id: 0,
    idUser: 0
  };

  sum: number = 0

  getSum() : void{
    for(let o of this.shoppingCart.items){
      this.sum = this.sum + o.price
    }
  }
  onRemoveClicked(o: OrderItem) : void{
    this.shoppingCart.items = this.shoppingCart.items.filter(item => item !== o);
  }
  buy(cart: ShoppingCart) : void{
    
  }
}
