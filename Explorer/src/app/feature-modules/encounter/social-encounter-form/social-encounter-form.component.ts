import { Component, OnInit } from '@angular/core';
import { Location } from '../model/location.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialEncounter } from '../model/socialEncounter.model';
import { EncounterService } from '../encounter.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-social-encounter-form',
  templateUrl: './social-encounter-form.component.html',
  styleUrls: ['./social-encounter-form.component.css']
})
export class SocialEncounterFormComponent implements OnInit {

  //user: User
  //buttonVisibility: boolean = false

  socialEncounterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    experience: new FormControl(null, [Validators.required]),
    radius: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required]),
    latitude: new FormControl(null, [Validators.required]),
    participantsNumber: new FormControl(null, [Validators.required]),
  });
  


  constructor(private service: EncounterService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    //this.user = this.authService.user$.getValue();
  }

  createEncounter(): void{
    const encounterLocation : Location = {
      longitude: this.socialEncounterForm.value.longitude || 0,
      latitude: this.socialEncounterForm.value.latitude || 0,
      }

    //const userType = this.user.role; 

    const socialEncounter: SocialEncounter = {
      id: 0,
      name: this.socialEncounterForm.value.name || "",
      description: this.socialEncounterForm.value.description || "",
      location: encounterLocation || null,
      experience: this.socialEncounterForm.value.experience || 0,
      status: 1,
      type: 1,
      radius: this.socialEncounterForm.value.radius || 0,
      participants: [],
      completers: [],
      requiredParticipants: this.socialEncounterForm.value.participantsNumber || 0,
      currentlyInRange: []
    }

    
    if(this.socialEncounterForm.valid)
    {
      this.service.createSocialEncounter(socialEncounter).subscribe({
        next: () => {console.log("New socialEncounter created")}
    });
    this.router.navigate(['home']);
    alert("Social encounter created successfully")
    }

  }
  

}
