import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _MenuService:MenuService,private _ActivatedRoute:ActivatedRoute, private _Location:Location) { }

  RestaurantId:any=1;
  MenuList:any[] = [];
  selectedItems: {id:number , name:string , description:string , imgUrl:string , price:number}[] = [];

  getMenu()
  {
    this.RestaurantId = this._ActivatedRoute.snapshot.paramMap.get('id')!;

    this._MenuService.getMenu(this.RestaurantId).subscribe({
      next :(response) => {
        this.MenuList = response[0].menuItems.map((menuItem: any) => {
          menuItem.checked = this.selectedItems.findIndex(i => i.id === menuItem.id) > -1;
          return menuItem;
        });
        this.RestaurantId = response[0].restaurantId;
        this.loadSelectedItemsFromLocalStorage();
      },
    })
  }

  updateSelectedItems(menu: {id:number , name:string , description:string , imgUrl:string , price:number, checked:boolean}, event: any) {
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
    menu.checked = isChecked;
    this.saveSelectedItemsToLocalStorage();
  }

  saveSelectedItemsToLocalStorage()
  {
    localStorage.setItem('BasketItems', JSON.stringify(this.selectedItems));
  }

  loadSelectedItemsFromLocalStorage()
  {
    const storedData = localStorage.getItem('BasketItems');
    if (storedData) {
      this.selectedItems = JSON.parse(storedData);
      this.MenuList.forEach((menuItem: any) => {
        menuItem.checked = this.selectedItems.findIndex(i => i.id === menuItem.id) > -1;
      });
    }
  }

  goBack()
  {
    this._Location.back()
  }

  ngOnInit(): void {
    this.getMenu();
  }

}
