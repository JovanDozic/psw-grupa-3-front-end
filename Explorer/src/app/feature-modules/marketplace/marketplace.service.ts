import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from './model/preference.model';
import { environment } from 'src/env/environment';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  addPreference(preference: Preference): Observable<Preference> {
    return this.http.post<Preference>(environment.apiHost + 'personalization/preference', preference);
  }

  getPreference(id: number): Observable<Preference> {
    return this.http.get<Preference>(environment.apiHost + 'personalization/preference/' + id);
  }

  getPreferences(): Observable<PagedResults<Preference>> {
    return this.http.get<PagedResults<Preference>>(environment.apiHost + 'personalization/preference/');
  }

  updatePreference(updatedPreference: Preference): Observable<Preference> {
    return this.http.put<Preference>(environment.apiHost + 'personalization/preference/' + updatedPreference.userId,
      updatedPreference);
  }

  deletePreference(id: number): Observable<Preference> {
    return this.http.delete<Preference>(environment.apiHost + 'personalization/preference/' + id);
  }


}
