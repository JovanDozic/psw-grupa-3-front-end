import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encounter } from './model/encounter.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { HiddenEncounter } from './model/hidden-encounter.model';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  constructor(private http: HttpClient) { }

  addHiddenEncounter(encounter: HiddenEncounter): Observable<HiddenEncounter>{
    return this.http.post<HiddenEncounter>(environment.apiHost + `hidden-encounters`, encounter);
  }
}
