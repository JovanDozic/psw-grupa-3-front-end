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
  
  picture: string = " ";

  constructor(private service: AdministrationService) {
  }
  ngOnChanges(): void {
    //this.profileForm.reset();
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
      id: this.profile.id || -1,
      userId: this.profile.userId || -1,
      picture: this.picture,
      name: this.profileForm.value.name || "",
      surname: this.profileForm.value.surname || "",
      bio: this.profileForm.value.bio || "",
      quote: this.profileForm.value.quote || "",
      email: this.profile.email
    };
    person.id = this.profile.id;
    console.log(person);
    this.service.updateUser(person).subscribe({
      next: (_) => { this.profileUpdated.emit();}
    });
  }
  
  encodeImages(selectedFiles: FileList) {
    for(let i = 0; i < selectedFiles.length; i++){
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.picture = event.target.result;
      }

      reader.readAsDataURL(file);
    }
  }


  onSelectedFile(event: any) {
    const selectedFiles: FileList = event.target.files;

    if (selectedFiles.length > 0) {
      this.encodeImages(selectedFiles);
    }
  }

  removeImage():void{
    this.picture = " ";
  }
}
