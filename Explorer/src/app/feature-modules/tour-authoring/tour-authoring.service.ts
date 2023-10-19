import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResults} from "../../shared/model/paged-results.model";
import {Points} from "./model/points.model";
import {environment} from "../../../env/environment";

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
}
