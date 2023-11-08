import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from './model/preference.model';
import { environment } from 'src/env/environment';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ShoppingCart } from './model/shopping-cart.model';
import { SearchResultTour } from './model/search-result-tour.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  addPreference(preference: Preference): Observable<Preference> {
    return this.http.post<Preference>(environment.apiHost + 'personalization/preference', preference);
  }

  getPreference(id: number): Observable<Preference> {
    return this.http.get<Preference>(environment.apiHost + 'personalization/preference/' + id);
  }

  getAllPreferences(): Observable<PagedResults<Preference>> {
    return this.http.get<PagedResults<Preference>>(environment.apiHost + 'personalization/preference/');
  }

  getAllForTourist(touristId: number): Observable<Preference[]>{
    return this.http.get<Preference[]>(environment.apiHost + 'personalization/preference/getAllForTourist/' + touristId);
  }

  updatePreference(updatedPreference: Preference): Observable<Preference> {
    return this.http.put<Preference>(environment.apiHost + 'personalization/preference/' + updatedPreference.userId,
      updatedPreference);
  }

  deletePreference(id: number): Observable<Preference> {
    return this.http.delete<Preference>(environment.apiHost + 'personalization/preference/' + id);
  }

  getCartByUserId(id: number): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(environment.apiHost + 'tourist/order/' + id)
  }

  updateCart(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(environment.apiHost + 'tourist/order', cart);
  }
  
  buyUpdate(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(environment.apiHost + 'tourist/order/buy', cart);
  }

  getSearchResults(longitude: number, latitude: number, distance: number): Observable<SearchResultTour[]>{
    const queryParams  = new HttpParams()
      .set('longitude', longitude)
      .set('latitude', latitude)
      .set('distance', distance);

    return this.http.get<SearchResultTour[]>(environment.apiHost + 'author/tour/searchByPointDistance', { params: queryParams });
  }
}
