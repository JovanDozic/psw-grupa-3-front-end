import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { SearchResultTour } from '../model/search-result-tour.model';
import { OrderItem } from '../model/order-item.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  tours: SearchResultTour[];
  starRating: number = 5;
  user: User;
  shoppingCart: ShoppingCart;

  constructor(private router: Router, private route: ActivatedRoute, private marketplaceService: MarketplaceService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getSearchResults();
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getShoppingCart();
    })
  }

  getShoppingCart() {
    this.marketplaceService.getCartByUserId(this.user.id).subscribe({
      next: (result: ShoppingCart) => {
        this.shoppingCart = result;
      },
      error: err => {
        console.log(err);
        this.shoppingCart = {
          id: 0,
          idUser: this.user.id,
          items: []
        }
      }
    })
    
  }

  getSearchResults() {
    const queryParams = this.route.snapshot.queryParams;
    const longitude = queryParams['longitude'];
    const latitude = queryParams['latitude'];
    const distance = queryParams['distance'];

    this.marketplaceService.getSearchResults(longitude, latitude, distance).subscribe({
      next: (results: SearchResultTour[]) => {
        this.tours = results;
      },
      error: (error) => {
        console.log(error);
      }
    })

    // this.tours = [
    //   { name: 'Result 1', description: 'Description 1', price: 55.23, id: 1 },
    //   { name: 'Result 2', description: 'Description 2', price: 69.57, id: 2 },
    //   { name: 'Result 3', description: 'Description 3', price: 25.12, id: 3 },
    //   { name: 'Result 4', description: 'Description 4', price: 34.68, id: 4 },
    //   { name: 'Result 5', description: 'Description 5', price: 43.93, id: 5 },
    // ];
  }

  addToCart(tour: SearchResultTour) {
    if (this.shoppingCart.items.findIndex((x: OrderItem) => x.idTour === tour.id) === -1) {
      const orderItem: OrderItem = {
        idTour: tour.id,
        name: tour.name,
        price: tour.price,
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/08/ba/a5/2c.jpg',
      };

      this.marketplaceService.addToCart(orderItem, this.user.id).subscribe({
        next: result => {
          alert('Added to cart!');
          this.getShoppingCart();
        },
        error: (err) => {
          console.log(err);
          alert('Error while adding to cart!');
        }
      })
    }
    else {
      alert('Tour is already in cart!');
    }
  }
}
