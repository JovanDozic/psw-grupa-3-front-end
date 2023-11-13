import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TourExecutionService} from "../tour-execution.service";
import {Position} from "../model/position.model";
import { Point } from '../../tour-authoring/model/points.model';
import { TourExecution } from '../model/tour-lifecycle.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { Router } from '@angular/router';
import { PointTask } from '../model/point-task.model';

@Component({
  selector: 'xp-position-simulator',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent implements OnInit{

  position: Position
  tourExecution: TourExecution
  updatedExecution: TourExecution
  doneTasks: PointTask[]
  lastTaskPoint: Point = {
    longitude: 1,
    latitude: 1,
    name: "",
    description: "",
    picture: "",
    tourId: 1}
  showModal: boolean = false;

  tour: Tour = {
    id: 1,
    name: "Tour Name",
    description: "Tour Description",
    difficult: 2,
    status: "Published",
    price: 50.0,
    points: [
      {
        id: 1, longitude: 19.83966064452716, latitude: 45.2517365956994,
        name: "prva", description: "nista", picture: "nista", tourId: 1
      },
      {
        id: 2, longitude: 19.84902279858312, latitude: 45.24806268406058,
        name: "druga", description: "nista", picture: "nista", tourId: 1
      },
      {
        id: 3, longitude: 19.850053025386785, latitude: 45.239239491988556,
        name: "treca", description: "nista", picture: "nista", tourId: 1
      }
    ],
    tags: '',
    authorId: 1
  }
  
  @Output() points: Point[] = [{id: 1, longitude: 19.83966064452716 , latitude: 45.2517365956994,
    name:"prva", description:"nista", picture:"nista", tourId: 1},
    {id: 2, longitude: 19.84902279858312 , latitude: 45.24806268406058,
      name:"druga", description:"nista", picture:"nista", tourId: 1},
      {id: 3, longitude: 19.850053025386785 , latitude: 45.239239491988556,
        name:"treca", description:"nista", picture:"nista", tourId: 1}
  ]

  positionForm = new FormGroup({
    longitude: new FormControl(-1, [Validators.required]),
    latitude: new FormControl(-1, [Validators.required])
  })

  constructor(private service: TourExecutionService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('Tour:', this.tour);
    this.service.startExecution(this.tour).subscribe({
      next: (result: TourExecution) => {
        this.tourExecution = result;
        console.log('Tour Execution Result:', result);
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
        console.log('Updated: ', result)
        this.doneTasks = this.getCompletedPoints(this.updatedExecution)
        if(this.doneTasks.length > 0){
            if((this.doneTasks[this.doneTasks.length - 1].point.latitude != this.lastTaskPoint.latitude)
                && (this.doneTasks[this.doneTasks.length - 1].point.longitude != this.lastTaskPoint.longitude))
                {
                    this.lastTaskPoint = this.doneTasks[this.doneTasks.length - 1].point;
                    console.log("Last point: ",this.lastTaskPoint)
                    //prikazi modal
                }else{
                    console.log("Last point: ", this.lastTaskPoint)
                    //nemoj prikazati modal
                }

        }
        console.log("Last point: ", this.lastTaskPoint)
        console.log("Done tasks: ",this.doneTasks)
      }
  })
    }

    getCompletedPoints(tourExecution: TourExecution): PointTask[] {
      // Koristimo filter metodu da izdvojimo samo tačke sa Done = true
      if (tourExecution.tasks) {
             return tourExecution.tasks.filter((pointTask) => pointTask.done === true);
      } else {
        return [];
      }
    }


    quitTour(){
      this.service.exitTour(this.tourExecution).subscribe({
        next: (result: TourExecution) => {
            console.log(result)
        }
      })
      this.router.navigate(['/tour-exit']);
    }
}
