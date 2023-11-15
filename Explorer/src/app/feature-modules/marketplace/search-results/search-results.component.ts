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


  }

  addToCart(tour: SearchResultTour) {
    if (this.shoppingCart.items.findIndex((x: OrderItem) => x.idTour === tour.id) === -1) {
      const orderItem: OrderItem = {
        idTour: tour.id,
        name: tour.name,
        price: tour.price,
        image: tour.points[0].picture,
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
