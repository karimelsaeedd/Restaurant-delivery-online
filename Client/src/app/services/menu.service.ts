import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  Url:string = environment.MenuUrl

  constructor(private _HttpClient:HttpClient) { }

  getMenu(RestaurantId:number):Observable<any>
  {
    return this._HttpClient.get(this.Url + RestaurantId)
  }

}
