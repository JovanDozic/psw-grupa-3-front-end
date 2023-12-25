import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/userprofile.model';
import { switchMap } from 'rxjs/operators';
import { Wallet } from '../../marketplace/model/wallet.model';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  person: Person;
  selectedProfile: Person;
  wallet: Wallet;

  constructor(private authService: AuthService, private service: AdministrationService) {}

  ngOnInit(): void {
    this.getUser();
    this.getFollowers();
  }

  getUser(): void {
    this.authService.user$.pipe(
      switchMap((user: User) => {
        this.user = user;
        this.getWallet(user.id);
        return this.service.getUser(this.user.id);
      })
    ).subscribe((result: any) => {
      this.person = result;
      console.log(this.person);
    });
  } 

  getFollowers(): void {
    this.service.getUserFollowers(this.user.id).subscribe((result: any) => {
      this.user.followers = result;
    });
  } 

  getWallet(userId: number): void{
    this.service.getUserWallet(userId).subscribe({
      next: (response: Wallet) => {
        this.wallet = response;
        console.log(this.wallet);
      }
    })
  }

  editProfile(profile: Person): void{
    this.selectedProfile = profile
    console.log(this.selectedProfile)
  }

}
