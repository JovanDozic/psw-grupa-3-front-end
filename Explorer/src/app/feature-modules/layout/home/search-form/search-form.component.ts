import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'xp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  searchForm = new FormGroup({
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    distance: new FormControl(0, [Validators.required])
  })
  public isCollapsed = false;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    let map = document.getElementById("map");
    if (map != null) {
      map.style.height = "20rem";
      map.style.width = "55rem";
      map.style.zIndex = "1";
    }
  }

  setLongitude(long: number) {
    this.searchForm.get('longitude')?.setValue(long.toString());
  }

  setLatitude(lat: number) {
    this.searchForm.get('latitude')?.setValue(lat.toString());
  }
  
  setDistance(event: Event){
    const distance = +(event.target as HTMLInputElement).value;
    this.searchForm.get('distance')?.setValue(distance)
  }

  searchClick() {
    if(this.searchForm.valid){
      let longitudeValue = this.searchForm.value.longitude;
      let latitudeValue = this.searchForm.value.latitude;
      let distanceValue = this.searchForm.value.distance;
      this.router.navigate(['/search-results'], { queryParams: { longitude: longitudeValue, latitude: latitudeValue, distance: distanceValue}})
    }
  }
}
