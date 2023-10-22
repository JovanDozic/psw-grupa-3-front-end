import { Injectable } from '@angular/core';
import {PagedResults} from "../../shared/model/paged-results.model";
import {Points} from "./model/points.model";
import { HttpClient } from '@angular/common/http';
import { TourReview } from './model/tourReview.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Tour } from './model/tour.model';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }
  
  getPoints(): Observable<PagedResults<Points>>{
    return this.http.get<PagedResults<Points>>(environment.apiHost + 'author/points');
  }

  deletePoints(id: number | undefined): Observable<Points> {
    return this.http.delete<Points>(environment.apiHost + 'author/points/' + id);
  }

  addPoint(point: Points): Observable<Points> {
    return this.http.post<Points>(environment.apiHost + 'author/points',point);
  }

  updatePoint(point: Points): Observable<Points> {
    return this.http.put<Points>(environment.apiHost + 'author/points/' + point.id, point);
  }
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
