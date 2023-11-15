import { Component } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-tourists-problems',
  templateUrl: './tourists-problems.component.html',
  styleUrls: ['./tourists-problems.component.css']
})
export class TouristsProblemsComponent {
  constructor(private service: TourAuthoringService) { }
  problems: any[] = [];
  shouldRenderUnsolvedForm = false;
  selectedProblem: any;
  user: User | undefined;
  
  ngOnInit(): void {
    this.service.getAllTouristsProblems().subscribe({
      next: (result: any) => {  
          this.problems = result;
          console.log('Data loaded successfully:', this.problems);
      },
      error: (error) => {
        console.error('API error:', error);
        // Handle error as needed
      }
    });
  }

  notSolvedForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  onUnsolvedClicked(problem: any): void {
    this.selectedProblem = problem;
    this.shouldRenderUnsolvedForm = true;
  }

  onIsNotSolved(): void {
    const response = this.notSolvedForm.get('comment')?.value;

    if (response !== null && response !== undefined) {
      this.service.problemNotSolved(this.selectedProblem.id, response)
        .subscribe(
          (result) => {
            // Update the data after a successful response
            this.updateData();
            console.log('Response submitted successfully:', result);
          },
          (error) => {
            console.error('Error submitting response:', error);
            // Handle error as needed
          }
        );
    }
  }

  onSolvedClicked(problem: any): void {
    this.selectedProblem = problem;
    this.service.solveProblem(this.selectedProblem.id)
        .subscribe(
          (result) => {
            // Update the data after a successful response
            this.updateData();
            console.log('Response submitted successfully:', result);
          },
          (error) => {
            console.error('Error submitting response:', error);
            // Handle error as needed
          }
        );
  }
  private updateData(): void {
    // Fetch the updated data from the service or update the existing data
    this.service.getAllTouristsProblems().subscribe({
      next: (result: any) => {
        this.problems = result;
        console.log('Data updated successfully:', this.problems);
      },
      error: (error) => {
        console.error('API error:', error);
        // Handle error as needed
      }
    });
  }
}