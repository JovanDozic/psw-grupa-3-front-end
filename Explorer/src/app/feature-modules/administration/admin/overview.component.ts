import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Overview } from '../model/overview.model';

@Component({
  selector: 'xp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(private service: AdministrationService) {
    this.userIdToBlock = 0;
   }

  users: Overview[] = [];
  userIdToBlock: number;

 

  ngOnInit(): void {
    // Call the method to get all users
    this.service.getAllUsers().subscribe(
      (data) => {
        console.log('Received users:', data);
        this.users = data.value; // Extract the array of users from pagedResults
      },
      (error) => {
        console.error(error);
        alert(error.error.message);
      }
    );
  }
  
  blockUser(userIdToBlock: string) {
    const Id = +userIdToBlock; // Konvertujte vrednost u broj, ako je to potrebno
    if (Id) {
      // Samo nastavite sa zahtevom za blokiranje korisnika ako je ID definisan i ispravan
      this.service.blockUser(Id).subscribe(
        (response) => {
          console.log('User blocked successfully:', response);
          // Ažurirajte listu korisnika ili obavite druge akcije nakon blokiranja
        },
        (error) => {
          console.error('Error blocking user:', error.message);
          alert('Error blocking user: ' + error.message);
        }
      );
    } else {
      console.error("User ID is not defined or is empty.");
      // Možete takođe prikazati poruku o grešci korisniku
    }
  }
  

  
}
