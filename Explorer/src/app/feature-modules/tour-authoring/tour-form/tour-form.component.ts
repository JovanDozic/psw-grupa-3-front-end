import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../model/tour.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnChanges, OnInit {

  @ViewChild('xp-map') map: MapComponent;
  @Output() tourUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  @Input() shouldEdit: boolean = false;
  user: User;
  longitude: number = 0;
  latitude: number = 0;

  constructor(private service: TourAuthoringService,
    private authService: AuthService,
    private token: TokenStorage) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnChanges(): void {
    this.tourForm.reset();
    if (this.shouldEdit) {
      this.tourForm.patchValue(this.tour);
    }
  }

  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    difficult: new FormControl(),
    price: new FormControl()
  });

  addTour(): void {
    const tour: Tour = {
      id: 0,
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      tags: this.tourForm.value.tags || "",
      status: "Draft",
      difficult: Number(this.tourForm.value.difficult),
      price: 0,
      authorId: this.user.id
    };
    this.service.addTour(tour).subscribe({
      next: () => { this.tourUpdated.emit() }
    });
  }

  updateTour(): void {
    const tour: Tour = {
      name: this.tourForm.value.name || "",
      description: this.tourForm.value.description || "",
      tags: this.tourForm.value.tags || "",
      difficult: Number(this.tourForm.value.difficult),
      status: "Draft",
      price: 0,
      authorId: this.user.id,
    };
    tour.id = this.tour.id;
    this.service.updateTour(tour).subscribe({
      next: () => { this.tourUpdated.emit(); }
    });
  }

  setLongitude(long: number) {
    this.longitude = long;
  }

  setLatitude(lat: number) {
    this.latitude = lat;
  }

  resetSelectedPoint(): void {
    // this.map.points = [];
    // this.longitude = 0;
    // this.latitude = 0;
  }
}
