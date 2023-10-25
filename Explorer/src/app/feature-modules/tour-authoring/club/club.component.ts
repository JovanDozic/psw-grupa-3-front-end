import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service'
import { Club } from '../model/club.model'
import { Person } from '../../administration/model/userprofile.model'
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MembershipRequest } from '../model/membership-request.model';

@Component({
  selector: 'xp-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {

  constructor(private service: TourAuthoringService, private authService: AuthService, private cd: ChangeDetectorRef) { }
  membershipRequest: MembershipRequest = {};  
  clubs: Club[] = [];
  selectedClub: Club;
  shouldRenderClubForm: boolean = false;
  shouldEdit: boolean = false;
  flag : boolean = false;

  user: User | undefined;

  ngOnInit(): void {
    this.getClubs();
    this.authService.user$.subscribe(user => {
      this.user = user;
      if(this.user.id !== 0)this.flag = true;
    })
  } 

  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    url: new FormControl('')
  })

  getClubs(): void {
    this.service.getClubs().subscribe({
      next: (result: PagedResults<Club>) => {
        console.log(result.results)
        const temp = result.results;
        for(const club of temp){
          if(club.ownerId === 1){
            this.clubs.push(club)
            console.log(club.name)
            console.log(club.url)
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  addClub() : void {
    console.log(this.clubForm.value)

    const club: Club = {
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      url: this.clubForm.value.url || "",
      ownerId: 1
    }

    this.service.addClub(club).subscribe(() => {
      this.getClubs();
      this.cd.detectChanges();
    });

  }
  onEditClicked(club: Club) : void {
    this.selectedClub = club;
    this.shouldRenderClubForm = true;
    this.shouldEdit = true;
  }
  
  onAddClicked() : void {
    this.shouldEdit = false;
    this.shouldRenderClubForm = true;
  }

  join(club: Club): void {
    this.membershipRequest.touristId = this.user?.id
    this.membershipRequest.clubId = club.id
    this.service.createMembershipRequest(this.membershipRequest).subscribe();
  }
}