import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PublicRegistrationRequest } from '../model/public-registration-request.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'public-registration-requests',
  templateUrl: './public-registration-requests.component.html',
  styleUrls: ['./public-registration-requests.component.css']
})
export class PublicRegistrationRequestsComponent implements OnInit {

  constructor(private service: AdministrationService, private tourService: TourAuthoringService ) { }

  registrationRequests: PublicRegistrationRequest[] = [];
  isRejectModalVisible: boolean = false;
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

  openRejectModal(request: PublicRegistrationRequest) {
    this.isRejectModalVisible = true;
    this.selectedRequest = request;
  }   

  closeRejectModal() {
    this.isRejectModalVisible = false;
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

    this.closeRejectModal();
  }

  approveRequest(request: PublicRegistrationRequest) : void {
    const foundRequest = this.registrationRequests.find(r => r === request);
    if(foundRequest){
      foundRequest.status = 'Approved';

      this.service.updatePublicRegistrationRequest(foundRequest).subscribe({
        next: () => {
           if(foundRequest.objectId !== -1)
           {
             this.tourService.setPublicObject(foundRequest.objectId).subscribe({
               next: () => {}
             })
           }
        }
      });
    }
    this.registrationRequests = this.registrationRequests.filter(r => r !== foundRequest);
  }

  rejectRequest(request: PublicRegistrationRequest) : void {
    const foundRequest = this.registrationRequests.find(r => r === request);
    if(foundRequest){
      foundRequest.status = 'Rejected';

      this.service.updatePublicRegistrationRequest(foundRequest).subscribe({
        next: () => {}
      });
    }
    this.registrationRequests = this.registrationRequests.filter(r => r !== foundRequest);
  }

}

