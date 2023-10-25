import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Tour } from './model/tour.model';
import { Problem } from './model/problem.model';
import {PagedResults} from "../../shared/model/paged-results.model";
import {Points} from "./model/points.model";
import { TourReview } from './model/tourReview.model';
import { Club } from './model/club.model';
import { ClubInvitation } from './model/clubInvitation.model';
import { ClubMember } from './model/clubMember.model';

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
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'author/tour/getAll');
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

  addClubInvitation(clubInvitation: ClubInvitation): Observable<ClubInvitation>{
    return this.http.post<ClubInvitation>(environment.apiHost + 'tourist/clubInvitation', clubInvitation);
  }

  getClubInvitations(): Observable<PagedResults<ClubInvitation>> {
    return this.http.get<PagedResults<ClubInvitation>>(environment.apiHost + 'tourist/clubInvitation/getAll')
  }


  deleteClubInvitation(id: number): Observable<ClubInvitation> {
    return this.http.delete<ClubInvitation>(environment.apiHost + 'tourist/clubInvitation/' + id);
  }

   addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(environment.apiHost + 'tourist/problem', problem);
  }

  getClubMembers(): Observable<PagedResults<ClubMember>> {
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + 'tourist/clubMember/getAll')
  }


  deleteClubMember(id: number): Observable<ClubMember> {
    return this.http.delete<ClubMember>(environment.apiHost + 'tourist/clubMember/' + id);
  }

}
 
