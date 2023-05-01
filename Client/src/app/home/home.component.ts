import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _RestaurantService:RestaurantService) { }

  RestaurantsList:any[] = [];

  getRestaurants()
  {
    this._RestaurantService.getRestaurants().subscribe({
      next :(response) => {
        // console.log(response);
        this.RestaurantsList = response
      },
    })
  }

  ngOnInit(): void {
    this.getRestaurants()
  }

}
