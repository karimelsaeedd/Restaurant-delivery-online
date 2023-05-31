import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _RestaurantService:RestaurantService,private Router:Router, private spinner: NgxSpinnerService) { }

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
      error: (err) => {
        console.log(err);
      },
      complete: () =>{
        this.spinner.hide();
      }
    })
  }

  search()
  {
    this.getRestaurants();
    // console.log(this.RestaurantsList);
  }

  goToMenu(restaurant: any) {
    console.log(restaurant);

    const storedData = localStorage.getItem('BasketItems');

    if (storedData) {
      const storedDataToCheck = JSON.parse(storedData);
      console.log('storedData', storedDataToCheck)
      if (storedDataToCheck[1] === restaurant.id) {
        this.Router.navigateByUrl('/menu/' + restaurant.id);
      } else {
        if (confirm('If you click "Ok" the selected items will be removed..')) {
          localStorage.removeItem('BasketItems');
          this.Router.navigateByUrl('/menu/' + restaurant.id);
        }
      }
    } else {
      this.Router.navigateByUrl('/menu/' + restaurant.id);
    }
    localStorage.setItem('RestaurantEmail', JSON.stringify(restaurant.email));

    console.log(storedData);
  }


  // navigateToMenu(RestaurantId:number)
  // {
  //   this.Router.navigate(['/menu',RestaurantId])
  // }

  ngOnInit(): void {
    this.spinner.show();
    this.getRestaurants()
  }

}
