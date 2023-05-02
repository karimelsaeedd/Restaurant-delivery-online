import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _MenuService:MenuService,private _ActivatedRoute:ActivatedRoute) { }

  RestaurantId:any=1;
  MenuList:any[] = [];
  selectedItems: {id:number , name:string , description:string , imgUrl:string , price:number}[] = [];

  getMenu()
  {
    this.RestaurantId = this._ActivatedRoute.snapshot.paramMap.get('id')!;

    this._MenuService.getMenu(this.RestaurantId).subscribe({
      next :(response) => {
        // console.log(response);
        this.MenuList = response[0].menuItems;
        // console.log(response[0].restaurantId);
        this.RestaurantId = response[0].restaurantId;
      },
    })
  }

  updateSelectedItems(menu: {id:number , name:string , description:string , imgUrl:string , price:number}, event: any) {
    const isChecked = event.target.checked;
    const id = menu.id;

    if (isChecked) {
      this.selectedItems.push(menu);
    } else {
      const index = this.selectedItems.findIndex(i => i.id === id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    console.log(this.selectedItems);

  }

  SaveInLocalStorage()
  {
    localStorage.setItem('BasketItems', JSON.stringify(this.selectedItems));
  }



  ngOnInit(): void {
    this.getMenu();
  }

}
