import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { Encounter } from './model/encounter.model';
import { Position } from '../tour-execution/model/position.model';
import { ParticipantLocation } from './model/participantLocation.model';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  constructor(private http: HttpClient) { }

  getAllEncounters(): Observable<PagedResults<Encounter>> {
    return this.http.get<PagedResults<Encounter>>(environment.apiHost + 'encounters/getAll');
  }

  activateEncounter(encounterId: number, location: ParticipantLocation): Observable<Encounter>{
      return this.http.put<Encounter>(environment.apiHost + 'encounters/activate/' + encounterId, location)
  }


}
