import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { Preference } from '../model/preference.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.css']
})
export class PreferenceFormComponent implements OnInit {

  private user: User;

  constructor(private service: MarketplaceService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  preferenceForm = new FormGroup({
    difficulty: new FormControl(0, [Validators.required]),
    transport: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required])
  })

  addPreference() {

    const preference: Preference = {
      userId: this.user.id,
      difficulty: this.preferenceForm.value.difficulty || 0,
      transport: this.preferenceForm.value.transport || "",
      tags: this.preferenceForm.value.tags || ""
    }

    this.service.addPreference(preference).subscribe({
      next: (result) => {
        console.log(result);
      }
    })
  }
}
