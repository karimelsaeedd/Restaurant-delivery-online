import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private _Location:Location , private _ToastrService:ToastrService, private _Router:Router) { }

  items:{id:number , name:string , description:string , imgUrl:string , price:number , quantity:number , totalPrice:number}[] = [];
  user:any ;
  confirm:boolean= false;
  basketitems:any = []

    calculatetotalItemPrice(item:any)
    {
      item.totalItemPrice = item.price * item.quantity
    }

    calculateBasketTotal() {
      let totalPrice = 0;
      for (let item of this.basketitems) {
        this.calculatetotalItemPrice(item);
        totalPrice += item.totalItemPrice;
      }
      return totalPrice;
    }

    increaseQuantity(item: any) {
      if (item.quantity < 10) {
        item.quantity++;
      }
    }

    decreaseQuantity(item: any) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    }

    removeItem(item:any)
    {
      this.confirm = confirm("Do you want to delete this item?");
      if(this.confirm)
      {
      const index = this.basketitems.findIndex((i:any) => i.id === item.id);
      if (index > -1) {
        this.basketitems.splice(index, 1);
    }
    localStorage.setItem('BasketItems', JSON.stringify(this.basketitems));
  }
}

    goBack()
    {
      this._Location.back()
    }

    CheckOut()
    {
      this._ToastrService.success('Order will arrive as soon as possible', 'Your Order had reserved'
      // , {
      //   positionClass: 'toast',
      //   timeOut: 1000
      // }
      );

      setTimeout(() => {
        this._Router.navigateByUrl('/home')
      }, 1000);

      localStorage.clear();
    }

  ngOnInit(): void {
    const BasketItems = localStorage.getItem('BasketItems');
    if (BasketItems) {
      this.items = JSON.parse(BasketItems);
      console.log(this.items);
    }

    const UserData = localStorage.getItem('UserData');
    if (UserData) {
      this.user = JSON.parse(UserData);
      console.log(this.user);
    }
    this.basketitems = this.items.map(item => ({...item, quantity:1 , totalItemPrice: 0}));

  }
}
