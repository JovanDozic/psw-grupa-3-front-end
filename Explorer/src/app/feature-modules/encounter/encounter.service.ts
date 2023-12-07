import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { Encounter } from './model/encounter.model';
import { Position } from '../tour-execution/model/position.model';
import { ParticipantLocation } from './model/participantLocation.model';
import { SocialEncounter } from './model/socialEncounter.model';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  constructor(private http: HttpClient) { }

  getAllEncounters(): Observable<PagedResults<Encounter>> {
    return this.http.get<PagedResults<Encounter>>(environment.apiHost + 'encounters/getAll');
  }

  activateSocialEncounter(encounterId: number, location: ParticipantLocation): Observable<Encounter>{
      return this.http.put<Encounter>(environment.apiHost + 'encounters/activate/' + encounterId, location)
  }

  solveSocialEncounter(encounterId: number, location: ParticipantLocation): Observable<SocialEncounter>{
    return this.http.put<SocialEncounter>(environment.apiHost + 'social-encounters/solve-social/' + encounterId, location)
  }

  getSocialEncounterById(encounterId: number): Observable<SocialEncounter>{
    return this.http.get<SocialEncounter>(environment.apiHost + 'social-encounters/get/' + encounterId);
  }


}
