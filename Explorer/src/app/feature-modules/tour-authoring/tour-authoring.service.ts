import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourReview } from './model/tourReview.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from './model/tour.model';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }
  
  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'author/tour/getAll')
  }

  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'author/tour/' + id);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(environment.apiHost + 'author/tour', tour);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(environment.apiHost + 'author/tour/' + tour.id, tour);
  }
  
  addTourReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview', tourReview);
  }

  addClub(club: Club) : Observable<Club>{
    return this.http.post<Club>(environment.apiHost + 'club', club)
  }

  getClubs() : Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'club/getAll')
  }
  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'club/' + club.id, club);
  }
}
