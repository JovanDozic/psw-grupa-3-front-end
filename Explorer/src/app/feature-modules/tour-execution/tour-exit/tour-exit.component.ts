import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tour-exit',
  templateUrl: './tour-exit.component.html',
  styleUrls: ['./tour-exit.component.css']
})
export class TourExitComponent {

  constructor(private router: Router) {}

  returnToHomePage() {
    this.router.navigate(['/']);
  }

}
