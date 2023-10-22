import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Overview } from '../model/overview.model';

@Component({
  selector: 'xp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(private service: AdministrationService) {}

  users: Overview[] = [];
  selectedUser: Overview | null = null;

  ngOnInit(): void {
    // Call the method to get all users
    this.service.getAllUsers().subscribe(
      (data) => {
        console.log('Received users:', data);
        this.users = data.value; 
      },
      (error) => {
        console.error(error);
        alert(error.error.message);
      }
    );
  }

  selectUser(user: Overview): void {
    this.selectedUser = user;
  }

  blockSelectedUser(): void {
    if (this.selectedUser) {
     
      this.service.blockUser(this.selectedUser.username).subscribe(
        (response) => {
          console.log('User blocked successfully:', response);
          
          this.users = this.users.filter((user) => user !== this.selectedUser);
          this.selectedUser = null;
        },
        (error) => {
          console.error('Error blocking the user:', error.message);
         
        }
      );
    } else {
      console.error("No user selected for blocking.");
     
    }
  }
  
}
