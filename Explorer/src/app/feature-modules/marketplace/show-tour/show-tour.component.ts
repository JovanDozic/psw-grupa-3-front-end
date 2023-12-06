import { Component, Output } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Point } from '../../tour-authoring/model/points.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../marketplace.service';
import { ShoppingCart } from '../model/shopping-cart.model';
import { OrderItem, OrderItemType } from '../model/order-item.model';


@Component({
  selector: 'xp-show-tour',
  templateUrl: './show-tour.component.html',
  styleUrls: ['./show-tour.component.css']
})
export class ShowTourComponent {

  constructor(private marketService: MarketplaceService, private route: ActivatedRoute, private checkpointService: TourAuthoringService, private service: AuthService, private router: Router) {}

  tour: Tour

  isPaid: boolean = true

  user: User;
  shoppingCart: ShoppingCart;

  forCart: boolean = true

  currentTourId: number
  couponCode: string = '';

  onCouponCodeChange(event: any) {
    this.couponCode = event.target.value;
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const tourIdFromParams = params['tourId'];
      console.log('Raw tourId from params:', tourIdFromParams);

      this.currentTourId = +tourIdFromParams;
      console.log('Parsed currentTourId:', this.currentTourId);

      this.service.user$.subscribe(user => {
        this.user = user;
        this.getShoppingCart();
      });
      this.loadTourData();
    });
  }

  @Output() points: Point[] = []

  private loadTourData() {
    if (this.currentTourId) {
      this.checkpointService.getTourById(this.currentTourId).subscribe({
        next: (result: Tour) => {
          this.tour = result;
          console.log(result);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
      this.marketService.getToken(this.user.id, this.currentTourId).subscribe({
        next: (result: boolean) => {
          this.isPaid = result;
          if (this.isPaid == false) {
            this.forCart = true;
          } else {
            this.forCart = false;
          }
          console.log(result);
          console.log(this.user.id);
          console.log(this.currentTourId);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  activateTour(){
    this.router.navigate(['/tour-execution-lifecycle'], { state: { tour: this.tour } });
}

getShoppingCart() {
    this.marketService.getCartByUserId(this.user.id).subscribe({
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

  addToCart() {
    if (this.shoppingCart.items.findIndex((x: OrderItem) => x.idType === this.tour.id && x.type === OrderItemType.singleTour) === -1) {
      const orderItem: OrderItem = {
        idType: this.tour.id,
        name: this.tour.name,
        price: this.tour.price,
        image: this.tour.points[0].picture,
        couponCode: this.couponCode,
        type: "SingleTour"
      };
      console.log(orderItem);

      this.marketService.addToCart(orderItem, this.user.id).subscribe({
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

