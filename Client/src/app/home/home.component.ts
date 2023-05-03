import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _RestaurantService:RestaurantService,private _Router:Router) { }

  RestaurantsList:any[] = [];
  AllRestaurantsList:any[] = [];
  SearchByRestaurantName:string = "";
  searchByCity:string = ""

  getRestaurants()
  {
    this._RestaurantService.getRestaurants().subscribe({
      next :(response) => {
        this.AllRestaurantsList = response;
        // console.log(response);
        this.RestaurantsList = response.filter((item:any) => item.name.toLowerCase().includes(this.SearchByRestaurantName.toLowerCase())
        && item.city.toLowerCase().includes(this.searchByCity.toLowerCase())
        )
      },
    })
  }

  search()
  {
    this.getRestaurants();
  }


  // navigateToMenu(RestaurantId:number)
  // {
  //   this._Router.navigate(['/menu',RestaurantId])
  // }

  ngOnInit(): void {
    this.getRestaurants()
  }

}
