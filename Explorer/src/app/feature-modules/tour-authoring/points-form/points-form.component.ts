import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TourAuthoringService} from "../tour-authoring.service";
import {Points} from "../model/points.model";

@Component({
  selector: 'xp-points-form',
  templateUrl: './points-form.component.html',
  styleUrls: ['./points-form.component.css']
})
export class PointsFormComponent implements OnChanges {

  @Output() pointUpdated = new EventEmitter<null>;
  @Input() point: Points;
  @Input() shouldEdit: boolean = false;

  constructor(private service: TourAuthoringService) {
  }

  pointsForm = new FormGroup({
    longitude: new FormControl(-1, [Validators.required]),
    latitude: new FormControl(-1, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
  })

  addPoint() {
    console.log(this.pointsForm.value);
    const point: Points = {
      id: 0,
      longitude: Number(this.pointsForm.value.longitude),
      latitude: Number(this.pointsForm.value.latitude),
      name: this.pointsForm.value.name || '',
      description: this.pointsForm.value.description || '',
      picture: this.pointsForm.value.picture || '',
      tourId: 0
    }

    this.service.addPoint(point).subscribe({
      next: (_) => {
        this.pointUpdated.emit()
      }
    });
  }

  updatePoint(): void {
    const point: Points = {
      id: this.point.id,
      longitude: Number(this.pointsForm.value.longitude),
      latitude: Number(this.pointsForm.value.latitude),
      name: this.pointsForm.value.name || '',
      description: this.pointsForm.value.description || '',
      picture: this.pointsForm.value.picture || '',
      tourId: 0
    }

    this.service.updatePoint(point).subscribe({
      next: (_) => {
        this.pointUpdated.emit();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pointsForm.reset();
    if (this.shouldEdit) {
      this.pointsForm.patchValue(this.point);
    }
  }

  GetLatitude(latitude: number) {
    console.log(latitude);
    this.pointsForm.get('latitude')?.patchValue(latitude);
  }

  GetLongitude(longitude: number) {
    console.log(longitude);
    this.pointsForm.get('longitude')?.patchValue(longitude);

  }
}
