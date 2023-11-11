import {Injectable, Input} from '@angular/core';
import {Position} from "./model/position.model";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../env/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../infrastructure/auth/model/user.model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {BehaviorSubject} from "rxjs";
import { TourExecution } from './model/tour-lifecycle.model';
import { Tour } from '../tour-authoring/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {
  user: BehaviorSubject<User>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = authService.user$;
  }

  startExecution(tour: Tour): Observable<TourExecution>{
    return this.http.post<TourExecution>(environment.apiHost + 'start-execution/' + tour.id, tour); 
  }

  updatePosition(tourExecutionId: number, position: Position): Observable<TourExecution> {
    return this.http.put<TourExecution>(environment.apiHost + 'update-position/' + tourExecutionId, position);
  }

  exitTour(tourExecution: TourExecution): Observable<TourExecution>{
    return this.http.patch<TourExecution>(environment.apiHost + 'quit/' + tourExecution.id, tourExecution);
  }
}
