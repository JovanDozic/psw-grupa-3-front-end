import { Component } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Problem } from '../../tour-authoring/model/problem.model';

@Component({
  selector: 'xp-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent {
  constructor(private service: AdministrationService) { }

  problems: Problem[] = [];

  
  ngOnInit(): void {
    this.service.getProblems().subscribe(
      (data) => {
        this.problems = data.results;
      },
      (error) => {
        console.log(error); 
        alert(error.error.message);
      }
    )
  }
}
