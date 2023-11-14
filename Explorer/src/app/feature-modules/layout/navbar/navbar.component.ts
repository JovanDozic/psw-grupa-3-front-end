import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AdministrationService } from 'src/app/feature-modules/administration/administration.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getNotifications();
  }

  onLogout(): void {
    this.authService.logout();
  }

  getNotifications(): void {
    this.administrationService.getUserNotifications(this.user.id).subscribe((result: any) => {
      this.user.notifications = result;
    });
  } 
}
