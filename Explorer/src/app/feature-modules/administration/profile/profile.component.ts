import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/userprofile.model';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  person: Person;

  constructor(private authService: AuthService, private service: AdministrationService){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
  }),

    this.service.getUser(this.user.id).subscribe({
      next: (result: any) => {
        this.person = result;
      },
    })

  }

}
