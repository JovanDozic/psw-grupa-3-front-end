import { Component, OnInit } from '@angular/core';
import { TourExecutionService } from '../tour-execution.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TourPurchaseToken } from '../model/tour-purchase-token.model';

@Component({
  selector: 'xp-purchased-tours',
  templateUrl: './purchased-tours.component.html',
  styleUrls: ['./purchased-tours.component.css']
})
export class PurchasedToursComponent implements OnInit {
  private user: User;
  tokens: TourPurchaseToken[];

  constructor(private service: TourExecutionService, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getPurchasedTours();
    })
    // this.tokens = [
    //   { id: 1, name: 'Result 1', tourId: 1, purchaseTime: '1/1/2023' },
    //   { id: 2, name: 'Result 2', tourId: 2, purchaseTime: '1/1/2023' },
    //   { id: 3, name: 'Result 3', tourId: 3, purchaseTime: '1/1/2023' },
    //   { id: 4, name: 'Result 4', tourId: 4, purchaseTime: '1/1/2023' },
    //   { id: 5, name: 'Result 5', tourId: 5, purchaseTime: '1/1/2023' },
    // ];
  }

  getPurchasedTours() {
    this.service.getTouristTokens(this.user.id).subscribe({
      next: response => {
        this.tokens = response;

      },
      error: err => {
        console.log(err);
      }
    })
  }
}
