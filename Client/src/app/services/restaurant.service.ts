import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url:string = environment.RestaurantUrl

  constructor(private _HttpClient:HttpClient) { }

  getRestaurants():Observable<any>
  {
    return this._HttpClient.get(this.url);
  }

}
