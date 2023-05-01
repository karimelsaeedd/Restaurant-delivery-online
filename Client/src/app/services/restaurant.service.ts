import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url:string = environment.Url

  constructor(private _HttpClient:HttpClient) { }

  getRestaurants():Observable<any>
  {
    return this._HttpClient.get(this.url);
  }

}
