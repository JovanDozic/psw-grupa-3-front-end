import { Component, OnInit } from '@angular/core';
import { Tour } from '../../model/tour.model';
import { TourAuthoringService } from '../../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.css']
})
export class CreateBundleComponent implements OnInit {
  
  public tours: Tour[]
  public toursForBundle: Tour[]

  constructor(private service: TourAuthoringService){}

  ngOnInit(): void {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
      },
      error: () => {
      }
    })
  }

  addTour(tour: Tour){
    this.toursForBundle.push(tour);
  }

  removeTour(tour: Tour){
    this.toursForBundle.filter(item => item !== tour);
  }
}
