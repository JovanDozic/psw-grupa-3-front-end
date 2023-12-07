import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { HiddenEncounter } from 'src/app/feature-modules/encounter/model/hidden-encounter.model';
import { environment } from 'src/env/environment';
import { ParticipantLocation } from './model/participant-location.model';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  constructor(private http: HttpClient) { }

  addHiddenEncounter(encounter: HiddenEncounter): Observable<HiddenEncounter> {
    return this.http.post<HiddenEncounter>(environment.apiHost + `hidden-encounters`, encounter);
  }

  getHiddenEncounters(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + `hidden-encounters/getAll`);
  }

  activateHiddenEncounter(encounterId: number, participantLocation: ParticipantLocation): Observable<HiddenEncounter> {
    return this.http.put<HiddenEncounter>(environment.apiHost + 'encounters/activate/' + encounterId, participantLocation);
  }

  solveHiddenEncounter(encounterId: number, participantLocation: ParticipantLocation): Observable<HiddenEncounter> {
    return this.http.put<HiddenEncounter>(environment.apiHost + 'hidden-encounters/solve-hidden/' + encounterId, participantLocation);
  }

}
