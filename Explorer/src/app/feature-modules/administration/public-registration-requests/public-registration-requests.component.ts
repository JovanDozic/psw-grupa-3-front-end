import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PublicRegistrationRequest } from '../model/public-registration-request.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'public-registration-requests',
  templateUrl: './public-registration-requests.component.html',
  styleUrls: ['./public-registration-requests.component.css']
})
export class PublicRegistrationRequestsComponent implements OnInit {

  constructor(private service: AdministrationService, private tourService: TourAuthoringService ) { }

  registrationRequests: PublicRegistrationRequest[] = [];
  selectedRequest: PublicRegistrationRequest;

  rejectionForm = new FormGroup({
    rejectionComment: new FormControl('') || "",
  });

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.service.getAllPendingRequests().subscribe({
      next: (result: PublicRegistrationRequest[]) => {
        this.registrationRequests = result;
      },
      error: () => {
      }
    })
  }
  
  selectRequest(request: PublicRegistrationRequest) {
       this.selectedRequest = request;
    }   

   confirmReject() {
     const foundRequest = this.registrationRequests.find(r => r === this.selectedRequest);
     if(foundRequest){
       foundRequest.status = 'Rejected';
       foundRequest.comment = this.rejectionForm.value.rejectionComment || "";

       this.service.updatePublicRegistrationRequest(foundRequest).subscribe({
         next: () => {}
       });
     }
     this.registrationRequests = this.registrationRequests.filter(r => r !== foundRequest);

   }

   confirmApprove() : void {
    const foundRequest = this.registrationRequests.find(r => r === this.selectedRequest);
    if(foundRequest){
      foundRequest.status = 'Approved';

      this.service.updatePublicRegistrationRequest(foundRequest).subscribe({
        next: () => {
          if(foundRequest.objectId !== -1 && foundRequest.tourId === -1)
          {
            this.tourService.setPublicObject(foundRequest.objectId).subscribe({
              next: () => {}
            })
          }
          if(foundRequest.objectId === -1 && foundRequest.tourId !== -1)
          {
            this.tourService.setPublicPoint(foundRequest.tourId, foundRequest.pointName).subscribe({
              next: () => {}
            })
          }
        }
      });
    }
    this.registrationRequests = this.registrationRequests.filter(r => r !== foundRequest);
   }

}

