import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourReview } from './model/tourReview.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }

  addTourReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview', tourReview);
  }
}
