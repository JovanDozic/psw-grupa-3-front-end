import {Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TourExecutionService} from "../tour-execution.service";
import {Position} from "../model/position.model";
import { Point } from '../../tour-authoring/model/points.model';
import { TourExecution } from '../model/tour-lifecycle.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PointTask } from '../model/point-task.model';

@Component({
  selector: 'xp-tour-execution-lifecycle',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent implements OnInit{

  tourExecution: TourExecution
  updatedExecution: TourExecution
  doneTasks: PointTask[]
  showMap: boolean = true;
  showMessage: boolean = false;
  showDiv: boolean = false

  lastTaskPoint: Point = {
    longitude: 1,
    latitude: 1,
    name: "",
    description: "",
    picture: ""
}

  tour: Tour 
  @Output() points: Point[] = []

  positionForm = new FormGroup({
    longitude: new FormControl(-1, [Validators.required]),
    latitude: new FormControl(-1, [Validators.required])
  })

  constructor(private service: TourExecutionService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const isReloaded = sessionStorage.getItem('isReloaded');
    if (!isReloaded) {
      sessionStorage.setItem('isReloaded', 'true');
      window.location.reload();
    } else {
    sessionStorage.removeItem('isReloaded');
    }

    this.tour = history.state.tour;
    console.log('Received tour:', this.tour);
    this.points = this.tour.points
    this.service.startExecution(this.tour).subscribe({
      next: (result: TourExecution) => {
        this.tourExecution = result;
      },
      error: (error) => {
        console.error('Error starting execution:', error);
      }
    });
  }

  GetLatitude(latitude: number) {
    console.log(latitude);
    this.positionForm.get('latitude')?.patchValue(latitude);
  }

  GetLongitude(longitude: number) {
    console.log(longitude);
    this.positionForm.get('longitude')?.patchValue(longitude);

  }
  
  confirmPosition(){
    const position : Position = {
      id: 1,
      longitude: Number(this.positionForm.value.longitude),
      latitude: Number(this.positionForm.value.latitude),
      touristId: this.service.user.value.id,
      lastActivity: new Date(Date.now())
    }

    this.service.updatePosition(this.tourExecution.id, position).subscribe({
      next: (result: TourExecution) => {
        this.updatedExecution = result
        this.setCurrentPosition()
        this.doneTasks = this.getCompletedPoints(this.updatedExecution)
        this.setLastPoint()
        this.completeTour()
      }
  })
    }

    completeTour(){
      if(this.isTourCompleted()){
          this.showMessage = true;
          this.showMap = false;          
      }
    }

    isTourCompleted(): boolean{
        return this.doneTasks.length == this.tour.points.length
    }

    setLastPoint(){
        if(this.doneTasks.length > 0){        
            if(this.isPointClose())
            {
              this.lastTaskPoint = this.doneTasks[this.doneTasks.length - 1].point;
            }else                 
              this.setCurrentPosition()
        }
    }

    isPointClose():boolean{
        return (this.doneTasks[this.doneTasks.length - 1].point.latitude !== this.lastTaskPoint.latitude)
        && (this.doneTasks[this.doneTasks.length - 1].point.longitude !== this.lastTaskPoint.longitude)
    }

    getCompletedPoints(tourExecution: TourExecution): PointTask[] {
      if (tourExecution.tasks)
      {
          return tourExecution.tasks.filter((pointTask) => pointTask.done === true);
      } else
          return [];
    }

    quitTour(){
      this.service.exitTour(this.tourExecution).subscribe({
        next: (result: TourExecution) => {
            console.log(result)
        }
      })
      this.showMessage = true
      this.showMap = false
    }

    returnToHomePage(){
        this.router.navigate(['/']);
    }

    hideDiv() {
        this.showDiv = false;
    }

    setCurrentPosition() {
        this.lastTaskPoint.name = 'Current position';
        this.lastTaskPoint.description = `Longitude: ${this.updatedExecution.position.longitude}\nLatitude: ${this.updatedExecution.position.latitude}`;
    }
}
