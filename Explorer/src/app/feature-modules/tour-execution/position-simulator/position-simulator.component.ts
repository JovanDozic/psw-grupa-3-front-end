import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TourExecutionService} from "../tour-execution.service";
import {Position} from "../model/position.model";
import { Point } from '../../tour-authoring/model/points.model';

@Component({
  selector: 'xp-position-simulator',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent {

  @Output() updatedPosition = new EventEmitter<Position>();
  @Output() points: Point[] = [{id: 1, longitude: 19.83966064452716 , latitude: 45.2517365956994,
    name:"prva", description:"nista", picture:"nista", tourId: 1}]

  positionForm = new FormGroup({
    longitude: new FormControl(-1, [Validators.required]),
    latitude: new FormControl(-1, [Validators.required])
  })
  constructor(private service: TourExecutionService) {
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
      touristId: this.service.user.value.id
    }
    this.updatedPosition.emit(position);
    }
}
