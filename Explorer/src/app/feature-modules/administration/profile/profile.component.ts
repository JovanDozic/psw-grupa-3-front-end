import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/userprofile.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  person: Person;
  selectedProfile: Person;
  shouldRenderProfileForm: boolean = false;

  constructor(private authService: AuthService, private service: AdministrationService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.authService.user$.pipe(
      switchMap((user: User) => {
        this.user = user;
        return this.service.getUser(this.user.id);
      })
    ).subscribe((result: any) => {
      this.person = result;
      console.log(this.person);
    });
  } 

  onEditClicked(profile: Person): void{
      this.selectedProfile = profile;
      this.shouldRenderProfileForm = true;
  }
}
