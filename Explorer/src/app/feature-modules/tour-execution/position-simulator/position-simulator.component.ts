import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TourExecutionService } from "../tour-execution.service";
import { Position } from "../model/position.model";
import { Point } from '../../tour-authoring/model/points.model';
import { TourExecution } from '../model/tour-lifecycle.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PointTask } from '../model/point-task.model';
import { SocialEncounter } from '../../encounter/model/socialEncounter.model';
import { HiddenEncounter } from '../../encounter/model/hidden-encounter.model';
import { EncounterService } from '../../encounter/encounter.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ParticipantLocation } from '../../encounter/model/participant-location.model';
import { Encounter } from '../../encounter/model/encounter.model';

@Component({
  selector: 'xp-tour-execution-lifecycle',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent implements OnInit {
  isShowReviewFormEnabled: boolean = false;
  isCreateBlogFormEnabled: boolean = false;

  showReviewForm() {
    this.isShowReviewFormEnabled = !this.isShowReviewFormEnabled;
  }

  showBlogForm() {
    this.isCreateBlogFormEnabled = !this.isShowReviewFormEnabled;
  }

  tourExecution: TourExecution
  updatedExecution: TourExecution
  tour: Tour
  doneTasks: PointTask[]
  hiddenEncounters: any[] = []
  selectedHiddenEncounter: HiddenEncounter = {
    "id": 0,
    "name": "",
    "description": "Encounter Description",
    "location": {
      "latitude": 45.248376910202616,
      "longitude": 19.836076282798334,
    },
    "experience": 50,
    "status": 2,
    "type": 1,
    "radius": 100,
    "participants": [],
    "completers": [],
    "image": "",
    "pointLocation": {
      "latitude": 0,
      "longitude": 0
    }
  }
  partLocation: ParticipantLocation
  showMap: boolean = true;
  showMessage: boolean = false;
  showDiv: boolean = false
  clickedBlackMarker: boolean = false
  canActivateHiddenEncounter: boolean = true
  canSolveHiddenEncounter: boolean = false

  activatedHiddenEncounter: Encounter = {
    "id": 0,
    "name": "",
    "description": "Encounter Description",
    "location": {
      "latitude": 45.248376910202616,
      "longitude": 19.836076282798334,
    },
    "experience": 50,
    "status": 2,
    "type": 1,
    "radius": 100,
    "participants": [],
    "completers": []
  }

  lastTaskPoint: Point = {
    longitude: 1,
    latitude: 1,
    name: "",
    description: "",
    picture: "",
    public: false
  }

  selectedSocialEncounter: SocialEncounter
  clickedMarker: boolean = false
  activatedEncounter: Encounter 
  canActivate: boolean = true
  canSolve: boolean = true
  solvedSocialEncounter: SocialEncounter

  encounterModal: Encounter ={
    "id": 0,
    "name": "",
    "description": "Encounter Description",
    "location": {
      "latitude": 45.248376910202616,
      "longitude": 19.836076282798334,
    },
    "experience": 50,
    "status": 2,
    "type": 1,
    "radius": 100,
    "participants": [

    ],
    "completers": [

    ]
  };

  encounters: Encounter[] = []


  @Output() points: Point[] = []

  positionForm = new FormGroup({
    longitude: new FormControl(-1, [Validators.required]),
    latitude: new FormControl(-1, [Validators.required])
  })

  constructor(private service: TourExecutionService, private encounterService: EncounterService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const isReloaded = sessionStorage.getItem('isReloaded');
    if (!isReloaded) {
      sessionStorage.setItem('isReloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('isReloaded');
    }    
    this.encounterService.getAllEncounters().subscribe(
      (data) => {
        this.encounters = data.results;
        console.log(this.encounters)
      },
      (error) => {
        console.log(error); 
        alert(error.error.message);
      }
    )
  
    this.getHiddenEncounters();
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
 
  handleMarkerClick(encounter: Encounter) {
    console.log('Marker clicked:', encounter);
    this.encounterModal = encounter;
    this.encounterService.getSocialEncounterById(this.encounterModal.id).subscribe({
      next: (result: SocialEncounter) =>{
        this.selectedSocialEncounter = result;
      }})
    if(this.encounterModal.type === 1)
        this.clickedMarker = true;
  }

  socialEncounterButton(){

    if(this.encounterModal.completers?.some(participant => participant.username === this.service.user.value.username)){
      this.canSolve = false
      this.canActivate = false     
  }

    if(!this.selectedSocialEncounter.currentlyInRange.some(participant => participant.username === this.service.user.value.username) &&
   this.encounterModal.completers?.some(participant => participant.username === this.service.user.value.username)
   || (this.selectedSocialEncounter.currentlyInRange.some(participant => participant.username === this.service.user.value.username) &&
   !this.encounterModal.completers?.some(participant => participant.username === this.service.user.value.username)))
        this.canSolve = false;
    else
        this.canSolve = true;

    if(!this.encounterModal.participants?.some(participant => participant.username === this.service.user.value.username)
    && !this.encounterModal.completers?.some(participant => participant.username === this.service.user.value.username))
        this.canActivate = true;
    else
        this.canActivate = false;

    if(this.canActivate)
      this.canSolve = false

    this.clickedMarker = false;
  }

  handleBlackMarkerClick(hiddenEncounter: HiddenEncounter) {
    this.selectedHiddenEncounter = hiddenEncounter;
    if (this.selectedHiddenEncounter.type == 2) {
      this.clickedBlackMarker = true;
    }
  }

  hiddenEncounterButton() {
    this.clickedBlackMarker = false;
  }

  activateHiddenEncounter() {
    if (this.selectedHiddenEncounter.id != null) {
      this.partLocation =
      {
        "username": this.service.user.value.username,
        "latitude": this.updatedExecution.position.latitude,
        "longitude": this.updatedExecution.position.longitude,
      }

      this.encounterService.activateHiddenEncounter(this.selectedHiddenEncounter.id, this.partLocation).subscribe({
        next: (result: Encounter) => {
          this.activatedHiddenEncounter = result;
          console.log(this.service.user.value.username)
          if (this.activatedHiddenEncounter && this.activatedHiddenEncounter.participants?.some(participant => participant.username === this.service.user.value.username)) {
            this.canActivateHiddenEncounter = false;
            this.canSolveHiddenEncounter = true;
          }
        }
      })
    }
  }


  solveHiddenEncounter() {
    if (this.selectedHiddenEncounter.id != null) {
      this.partLocation =
      {
        "username": this.service.user.value.username,
        "latitude": this.updatedExecution.position.latitude,
        "longitude": this.updatedExecution.position.longitude,
      }
      this.encounterService.solveHiddenEncounter(this.selectedHiddenEncounter.id, this.partLocation).subscribe({
        next: (result: HiddenEncounter) => {
          this.activatedHiddenEncounter = result;
          if (this.activatedHiddenEncounter && this.activatedHiddenEncounter.completers?.some(completer => completer.username === this.service.user.value.username)) {
            this.canSolveHiddenEncounter = false;
            this.canActivateHiddenEncounter = true;
          }
        }
      })
    }
  }

  GetLatitude(latitude: number) {
    console.log(latitude);
    this.positionForm.get('latitude')?.patchValue(latitude);
  }


  GetLongitude(longitude: number) {
    console.log(longitude);
    this.positionForm.get('longitude')?.patchValue(longitude);

  }

  confirmPosition() {
    const position: Position = {
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

    activateSocialEncounter(){
      if(this.encounterModal.name != ""){
        this.partLocation =
         {"username": this.service.user.value.username,
          "latitude": this.updatedExecution.position.latitude,
          "longitude": this.updatedExecution.position.longitude,
                    }
        this.encounterService.activateSocialEncounter(this.encounterModal.id, this.partLocation).subscribe({
          next: (result: Encounter) => {
                this.activatedEncounter = result;
                if(this.activatedEncounter.participants?.some(participant => participant.username === this.service.user.value.username)){
                    this.canActivate = false;
                    this.canSolve = true;
                    this.ngOnInit();
                }
                console.log("aktivirani: ", result)
          }
        })
      } 
    }

    solveSocialEncounter(){
      if(this.encounterModal.name != ""){
        this.partLocation =
         {"username": this.service.user.value.username,
          "latitude": this.updatedExecution.position.latitude,
          "longitude": this.updatedExecution.position.longitude,
                    }
        this.encounterService.solveSocialEncounter(this.encounterModal.id, this.partLocation).subscribe({
          next: (result: SocialEncounter) => {
            this.solvedSocialEncounter = result;
            if (
              (!this.solvedSocialEncounter.participants || this.solvedSocialEncounter.participants.length === 0) ||
              this.solvedSocialEncounter.currentlyInRange.some(
                participant => participant.username === this.service.user.value.username
              )
            ) {
              this.canSolve = false;
              this.ngOnInit();
            }
            console.log(result);
          }
        })
      } 
    }

    completeTour(){
      if(this.isTourCompleted()){
          this.showMessage = true;
          this.showMap = false;          
      }
  }

  isTourCompleted(): boolean {
    return this.doneTasks.length == this.tour.points.length
  }

  setLastPoint() {
    if (this.doneTasks.length > 0) {
      if (this.isPointClose()) {
        this.lastTaskPoint = this.doneTasks[this.doneTasks.length - 1].point;
      } else
        this.setCurrentPosition()
    }
  }

  isPointClose(): boolean {
    return (this.doneTasks[this.doneTasks.length - 1].point.latitude !== this.lastTaskPoint.latitude)
      && (this.doneTasks[this.doneTasks.length - 1].point.longitude !== this.lastTaskPoint.longitude)
  }

  getCompletedPoints(tourExecution: TourExecution): PointTask[] {
    if (tourExecution.tasks) {
      return tourExecution.tasks.filter((pointTask) => pointTask.done === true);
    } else
      return [];
  }

  quitTour() {
    this.service.exitTour(this.tourExecution).subscribe({
      next: (result: TourExecution) => {
        console.log(result)
      }
    })
    this.showMessage = true
    this.showMap = false
  }

  returnToHomePage() {
    this.router.navigate(['/']);
  }

  hideDiv() {
    this.showDiv = false;
  }

  setCurrentPosition() {
    this.lastTaskPoint.name = 'Current position';
    this.lastTaskPoint.description = `Longitude: ${this.updatedExecution.position.longitude}\nLatitude: ${this.updatedExecution.position.latitude}`;
  }

  getHiddenEncounters() {
    this.encounterService.getHiddenEncounters().subscribe({
      next: (result: any[]) => {
        this.hiddenEncounters = result;
      },
      error: () => {
      }
    })
  }

}
