import { Component, Output } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Point } from '../../tour-authoring/model/points.model';
import { ActivatedRoute } from '@angular/router';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MarketplaceService } from '../marketplace.service';


@Component({
  selector: 'xp-show-tour',
  templateUrl: './show-tour.component.html',
  styleUrls: ['./show-tour.component.css']
})
export class ShowTourComponent {

  constructor(private marketService: MarketplaceService, private route: ActivatedRoute, private checkpointService: TourAuthoringService, private service: AuthService) {}

  tour: Tour

  isPaid: boolean = true

  user: User

  forCart: boolean = true

  currentTourId: number
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const tourIdFromParams = params['tourId'];
    console.log('Raw tourId from params:', tourIdFromParams);

    this.currentTourId = +tourIdFromParams;
    console.log('Parsed currentTourId:', this.currentTourId);

    this.service.user$.subscribe(user => {
      this.user = user;
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
          if(this.isPaid == false){
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
}
