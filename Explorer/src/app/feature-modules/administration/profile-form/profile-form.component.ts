import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../model/userprofile.model';
import { AdministrationService } from '../administration.service';


@Component({
  selector: 'xp-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges {

  @Input() profile: Person;
  @Output() profileUpdated = new EventEmitter<null>();

  constructor(private service: AdministrationService) {
  }
  ngOnChanges(): void {
    this.profileForm.reset();
    this.profileForm.patchValue(this.profile);
  }

  profileForm = new FormGroup({
      picture: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
      quote: new FormControl('', [Validators.required])
  });

  saveProfile(): void{
    const person: Person = {
      userId: this.profile.userId || -1,
      picture: this.profileForm.value.picture || "",
      name: this.profileForm.value.name || "",
      surname: this.profileForm.value.surname || "",
      bio: this.profileForm.value.bio || "",
      quote: this.profileForm.value.quote || "",
    };
    person.id = this.profile.id;
    this.service.updateUser(person).subscribe({
      next: () => { this.profileUpdated.emit();
        }
    });
  }

}
