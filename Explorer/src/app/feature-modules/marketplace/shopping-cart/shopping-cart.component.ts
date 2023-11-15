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

 tour1: Tour = {
  id: 1,
    name: 'Tura u planinama',
    description: 'Istraživanje prelepih planinskih predela.',
    difficult: 4,
    tags: 'Planinarenje, Priroda',
    status: 'Aktivna',
    price: 120.00,
    guide: {
      name: 'string',
      surname: 'string',
      email: 'string'
    },
    length: 0,
    publishTime: '',
    arhiveTime: '',
    points: [],
    requiredTime: {
      transportType: 'Bike',
      minutes: 20
    }
  };
  
  tour2: Tour = {
    id: 2,
    name: 'Pustolovna avantura',
    description: 'Najuzbudljivija avantura vašeg života!',
    difficult: 5,
    tags: 'Pustinja, Avantura',
    status: 'Aktivna',
    price: 200.00,
    guide: {
      name: 'string',
      surname: 'string',
      email: 'string'
    },
    length: 0,
    publishTime: '',
    arhiveTime: '',
    points: [],
    requiredTime: {
      transportType: 'Bike',
      minutes: 20
    }
  };
  
 tour3: Tour = {
  id: 3,
    name: 'Istorijski obilazak grada',
    description: 'Upoznajte bogatu istoriju našeg grada.',
    difficult: 2,
    tags: 'Istorija, Turizam',
    status: 'Nedostupna',
    price: 50.00,
    guide: {
      name: 'string',
      surname: 'string',
      email: 'string'
    },
    length: 0,
    publishTime: '',
    arhiveTime: '',
    points: [],
    requiredTime: {
      transportType: 'Bike',
      minutes: 20
    }
  };
  
  tours: Tour[] = [this.tour1, this.tour2, this.tour3];

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
