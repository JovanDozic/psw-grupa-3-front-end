import { Component, OnInit } from '@angular/core';
import { Preference } from '../model/preference.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  private user: User;

  shouldEdit: boolean;
  preferences: Preference[] = [];
  shouldRenderPreferenceForm: boolean = false;
  selectedPreference: Preference;

  constructor(private service: MarketplaceService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getPreferences();
  }

  getPreferences() {
    this.service.getAllForTourist(this.user.id).subscribe({
      next: (result: Preference[]) => {
        this.preferences = result;
      }
    })
  }

  deletePreference(id: number) {
    this.service.deletePreference(id).subscribe({
      next: (_) => {
        this.getPreferences();
        console.log("Successfully deleted!");
      }
    })
  }

  onEditClicked(preference: Preference) {
    this.selectedPreference = preference;
    this.shouldRenderPreferenceForm = true;
    this.shouldEdit = true;
  }

  onAddClicked() {
    this.shouldRenderPreferenceForm = true;
    this.shouldEdit = false;
  }


}
