import { Component, OnInit, Output } from '@angular/core';
import { Tour } from '../model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Point } from '../model/points.model';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tours: Tour[] = [];
  @Output() points: Point[] = [];
  selectedTour: Tour;
  shouldRenderTourForm: boolean = false;
  shouldEdit: boolean = false;

  constructor(private service: TourAuthoringService) { }

  ngOnInit(): void {
    // TODO: uncomment this
    // this.getTours();

    // TODO: remove this
    this.tours = [
      { id: 1, name: 'Tour 1', description: 'This is tour 1', difficult: 1, tags: 'tag1, tag2', status: 'Draft', price: 0, authorId: 1},
      { id: 2, name: 'Tour 2', description: 'This is tour 2', difficult: 2, tags: 'tag1, tag2', status: 'Draft', price: 0, authorId: 1},
      { id: 3, name: 'Tour 3', description: 'This is tour 3', difficult: 3, tags: 'tag1, tag2', status: 'Draft', price: 0, authorId: 1},
      { id: 4, name: 'Tour 4', description: 'This is tour 4', difficult: 4, tags: 'tag1, tag2', status: 'Draft', price: 0, authorId: 1},
      { id: 5, name: 'Tour 5', description: 'This is tour 5', difficult: 5, tags: 'tag1, tag2', status: 'Draft', price: 0, authorId: 1}
    ];

  }

  deleteTour(id: number): void {
    this.service.deleteTour(id).subscribe({
      next: () => {
        this.getTours();
      },
    })
  }

  getTours(): void {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
      },
      error: () => {
      }
    })
  }

  onEditClicked(tour: Tour): void {
    this.selectedTour = tour;
    this.shouldRenderTourForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderTourForm = true;
  }

  getTourPoints(id: number): void {
    this.service.getPointsForTour(id).subscribe({
      next: (result: Point[]) => {
        this.points = result
      }
    })
  }
}
