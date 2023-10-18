import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AppRating } from './model/app-rating.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'administration/equipment')
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(environment.apiHost + 'administration/equipment/' + id);
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(environment.apiHost + 'administration/equipment', equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(environment.apiHost + 'administration/equipment/' + equipment.id, equipment);
  }

  // App ratings
  getAppRatings(): Observable<PagedResults<AppRating>> {
    return this.http.get<PagedResults<AppRating>>(environment.apiHost + 'administration/app-ratings')
  }
  addAppRating(rating: AppRating): Observable<AppRating> {
    return this.http.post<AppRating>(environment.apiHost + 'administration/app-ratings', rating);
  }

  // TODO: Check if user already rated the app
  // getAppRating(id: number) {
  //   throw new Error('Method not implemented.');
  // }

}
