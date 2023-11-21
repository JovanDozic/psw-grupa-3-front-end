
import { Component } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Problem } from '../../tour-authoring/model/problem.model';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
 
  selector: 'xp-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  
})

export class ProblemsComponent {
  problems: Problem[] = [];
  selectedDeadline: Date;
  newDeadlineValue: string; 
  datePipe : DatePipe;
  newDeadlineForm: FormGroup;

  constructor(private service: AdministrationService,  private formBuilder: FormBuilder,) {
   
  
  }


  ngOnInit(): void {
    this.refreshProblems(); 
  
    this.newDeadlineForm = this.formBuilder.group({
      newDeadlineValue: ['']
     }); // Inicijalizujte formu sa praznim stringom ili drugom vrednošću po potrebi
  }

 

  problemForm = new FormGroup({
    selectedDate: new FormControl(new Date()),
  });
  setDeadlineForProblem(problemId: number): void {
    const newDeadline = new Date(this.newDeadlineForm.value.newDeadlineValue);
    
    this.service.setProblemDeadline(problemId, newDeadline).subscribe(
      (result) => {
        console.log('Problem uspešno ažuriran:', result);
        // Ovde možete dodati dodatnu logiku ili ažurirati korisnički interfejs
      },
      (error) => {
        console.error('Greška pri ažuriranju problema:', error);
        // Ovde možete dodati logiku za prikazivanje greške korisniku
      }
    );
  }

  
  isOverdue(time: Date): boolean {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return new Date(time) <= fiveDaysAgo;
  }

  deleteProblem(id: number): void {
    this.service.deleteProblem(id).subscribe({
      next: () => {
        this.refreshProblems();
      },
    });
  }

  refreshProblems(): void {
    this.service.getUnresolvedProblemsWithDeadline().subscribe(
      (data) => {
        this.problems = data.results;
      },
      (error) => {
        console.error('Failed to refresh problems:', error);
      }
    );
  }

  passedDeadline(deadline: Date): boolean {
    const currentTime = new Date();
    return new Date(deadline) < currentTime;
  }
}