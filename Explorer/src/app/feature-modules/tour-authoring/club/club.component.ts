import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service'
import { Club } from '../model/club.model'

@Component({
  selector: 'xp-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {

  constructor(private service: TourAuthoringService) { }
  
  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    URL: new FormControl('')
  })

  addClub() : void {
    console.log(this.clubForm.value)

    const club: Club = {
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      URL: this.clubForm.value.description || "",
      ownerId: 1
    }

    this.service.addClub(club).subscribe();
  }
}