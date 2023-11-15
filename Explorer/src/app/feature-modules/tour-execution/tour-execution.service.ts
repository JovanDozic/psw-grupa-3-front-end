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
import { TourPurchaseToken } from './model/tour-purchase-token.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {
  user: BehaviorSubject<User>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = authService.user$;
  }

  startExecution(tour: Tour): Observable<TourExecution> {
    const url = `${environment.apiHost}tourist/tourExecution/start-execution/${tour.id}`;
    return this.http.post<TourExecution>(url, tour);
  }

  updatePosition(tourExecutionId: number, position: Position): Observable<TourExecution> {
    return this.http.put<TourExecution>(environment.apiHost + 'tourist/tourExecution/update-position/' + tourExecutionId, position);
  }

  exitTour(tourExecution: TourExecution): Observable<TourExecution>{
    return this.http.patch<TourExecution>(environment.apiHost + 'tourist/tourExecution/quit/' + tourExecution.id, tourExecution);
  }

  getTouristTokens(userId: number): Observable<TourPurchaseToken[]> {
    return this.http.get<TourPurchaseToken[]>(environment.apiHost + 'tourist/tourPurchaseToken/' + userId);
  }
}