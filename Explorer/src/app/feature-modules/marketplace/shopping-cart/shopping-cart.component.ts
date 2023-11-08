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
    this.authService.user$.subscribe(user => {
      this.user = user;
      //this.shoppingCart.idUser = 1;
      this.getSum();
    })
  } 

 tour1: Tour = {
    name: 'Tura u planinama',
    description: 'Istraživanje prelepih planinskih predela.',
    difficult: 4,
    tags: 'Planinarenje, Priroda',
    status: 'Aktivna',
    price: 120.00,
    authorId: 1
  };
  
  tour2: Tour = {
    name: 'Pustolovna avantura',
    description: 'Najuzbudljivija avantura vašeg života!',
    difficult: 5,
    tags: 'Pustinja, Avantura',
    status: 'Aktivna',
    price: 200.00,
    authorId: 2
  };
  
 tour3: Tour = {
    name: 'Istorijski obilazak grada',
    description: 'Upoznajte bogatu istoriju našeg grada.',
    difficult: 2,
    tags: 'Istorija, Turizam',
    status: 'Nedostupna',
    price: 50.00,
    authorId: 1
  };
  
  tours: Tour[] = [this.tour1, this.tour2, this.tour3];

  shoppingCart: ShoppingCart

  user: User

  sum: number = 0

  getSum() : void{
    for(let o of this.tours){
      this.sum = this.sum + o.price
    }
  }

  onRemoveClicked(t: Tour) : void{
    this.tours = this.tours.filter(item => item !== t);
    this.sum = 0;
    this.getSum();
    this.changeCart();
    this.updateCart();
  }

  buy() : void {
    this.changeCart();
    this.buyUpdate()
  }

  changeCart() : void {
    this.shoppingCart.items = []
    for(let tour of this.tours){
      if(tour.id !== undefined){
      const item: OrderItem = {
        idTour: tour.id,
        name: tour.name,
        price: tour.price
      }
      this.shoppingCart.items.push(item);
    }
    }
  }

  updateCart() {
    this.service.updateCart(this.shoppingCart).subscribe({
      next: (result: ShoppingCart) => {
        if(result == null){
          console.log("update error!")
        }
        console.log("successfully updated!");
      }
    })
  }

  buyUpdate() {
    this.service.buyUpdate(this.shoppingCart).subscribe({
      next: (result: ShoppingCart) => {
        if(result == null){
          console.log("update error!")
        }
        console.log("successfully updated!");
      }
    })
  }
}
