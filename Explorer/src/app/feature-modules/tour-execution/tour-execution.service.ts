import { Injectable, Input } from '@angular/core';
import { Position } from "./model/position.model";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../../env/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../../infrastructure/auth/model/user.model";
import { AuthService } from "../../infrastructure/auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { TourPurchaseToken } from './model/tour-purchase-token.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {
  user: BehaviorSubject<User>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = authService.user$;
  }

  //TODO This will be patch method when aggregate is implemented
  updatePosition(position: Position): Observable<Position> {
    return this.http.put<Position>(environment.apiHost + 'tourist/position/' + position.id, position);
  }

  getTouristTokens(userId: number): Observable<TourPurchaseToken[]> {
    return this.http.get<TourPurchaseToken[]>(environment.apiHost + 'tourist/tourPurchaseToken/' + userId);
  }
}