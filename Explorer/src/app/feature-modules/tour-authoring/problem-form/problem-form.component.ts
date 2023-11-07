import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Problem } from '../model/problem.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { DatePipe } from '@angular/common';
import { Tour } from '../model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent implements OnChanges {

  tours: Tour[] =  [];
  selectedTour: Tour;
  shouldRenderProblemForm: boolean = false;
  shouldRenderTourReviewForm: boolean = false;
  shouldRenderTourReviewList : boolean = false;
  averageRatings: { [tourId: number]: number } = {};

  user: User | undefined;
  
  @Output() problemUpdated = new EventEmitter<null>();
  @Input() problem: Problem;
  @Input() shouldEdit: boolean = false;

  constructor(private authService: AuthService, private service: TourAuthoringService) {}


  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.getTours();
  }

  ngOnChanges(): void {
    this.problemForm.reset();
    if(this.shouldEdit) {
      this.problemForm.patchValue(this.problem);
    }
  }

  problemForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    priority: new FormControl(false),
    description: new FormControl('', [Validators.required]),
    time: new FormControl(new Date(Date.now()), [Validators.required]), 
  });

  addProblem(): void {
    const problem: Problem = {
        category: this.problemForm.value.category || "",
        priority: this.problemForm.value.priority || false, 
        description: this.problemForm.value.description || "",
        time: this.formatDate(this.problemForm.value.time),
        tourId: this.selectedTour.id || 1,
        touristId: this.user?.id || -1
    };
    this.service.addProblem(problem).subscribe({
      next: () => { this.problemUpdated.emit() }
    });
  }

  formatDate(selectedDate: Date | null | undefined): Date {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(selectedDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
    return formattedDate ? new Date(formattedDate) : new Date();
  }

  getTours(): void {
    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
        for (const tour of this.tours) {
          if (tour.id !== undefined) { 
            this.calculateAverageRating(tour.id);
          }
        }
        
      },
      error: () => {
      }
    })
  }

  onProblemClicked(tour: Tour): void {
    this.selectedTour = tour;
    this.shouldRenderProblemForm = true;
    this.shouldRenderTourReviewForm = false;
    this.shouldRenderTourReviewList = false;
  }

  changeProblemVisibility(): void {
    this.shouldRenderProblemForm = false;
  }

  onRatingClicked(tour: Tour): void {
    this.selectedTour = tour;
    this.shouldRenderTourReviewForm = true;
    this.shouldRenderProblemForm = false;
    this.shouldRenderTourReviewList = false;
  }

  changeReviewVisibility(): void {
    this.shouldRenderTourReviewForm = false;
  }

  showTourReviews(tour: Tour) : void {
    this.selectedTour = tour;
    this.shouldRenderTourReviewList = true;
    this.shouldRenderProblemForm = false;
    this.shouldRenderTourReviewForm = false;
  }
  calculateAverageRating(tourId: number): void {
    this.service.getAverageRating(tourId).subscribe(
      (averageRating: number) => {
        this.averageRatings[tourId] = averageRating; 
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}