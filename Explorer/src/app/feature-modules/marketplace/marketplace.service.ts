import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from './model/preference.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  addPreference(preference: Preference): Observable<Preference>{
    return this.http.post<Preference>(environment.apiHost + 'personalization/preference', preference);
  }
}
