import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

import { Overview } from './model/overview.model';

import { AppRating } from './model/app-rating.model';
import { TouristEquipment } from './model/tourist-equipment.model';


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

  getAllUsers(): Observable<PagedResults<Overview>> {
    return this.http.get<PagedResults<Overview>>(environment.apiHost + 'administration/users');
  }
  
  blockUser(username: string): Observable<any> {
    const url = `${environment.apiHost}administration/users/block-users`;
    return this.http.post(url, [username]);
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

  //Tourist equipment record
  getTouristEquipment(): Observable<PagedResults<TouristEquipment>> {
    return this.http.get<PagedResults<TouristEquipment>>(environment.apiHost + 'tourist/equipment')
  }

  addTouristEquipment(touristEquipment: TouristEquipment): Observable<TouristEquipment>{
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/equipment', touristEquipment);
  }
  removeTouristEquipment(id: number): Observable<TouristEquipment> {
    return this.http.delete<TouristEquipment>(environment.apiHost + 'tourist/equipment/' + id);
  }


}
