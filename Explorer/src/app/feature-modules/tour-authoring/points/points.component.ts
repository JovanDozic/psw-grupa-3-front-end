import {Component, OnInit} from '@angular/core';
import {Points} from "../model/points.model";
import {TourAuthoringService} from "../tour-authoring.service";
import {PagedResults} from "../../../shared/model/paged-results.model";

@Component({
  selector: 'xp-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit{

  points: Points[] = [];
  constructor(private service: TourAuthoringService) {
  }

  ngOnInit(): void {
    this.service.getPoints().subscribe({
      next: (result: PagedResults<Points>) => {
        this.points = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
