import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SendMailService } from '../services/SendMail.service';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(
    private _Location:Location ,
    private _ToastrService:ToastrService,
    private _Router:Router,
    private _SendMailService:SendMailService
    ) { }

  RestaurantId:number = 0;
  RestaurantEmail:string="";
  items:{id:number , name:string , description:string , imgUrl:string , price:number , quantity:number , totalItemPrice:number}[] = [];
  data = {
    SelectedItems:this.items,
    RestaurantId:1
  } ;

  user:any ;
  confirm:boolean= false;
  basketitems:any = []

    dataToSend:{} = {
      EmailToRestaurant:"",
      RestaurantSubject:"",
      RestaurantBody:"",
      EmailToClient:"",
      ClientSubject:"",
      ClientBody:""
    }

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


    generateHtmlTable(data: any[]): string {

      let html = `<table style="border-collapse: collapse; width: 100%;"><tr><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">User Name</th><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">User Phone</th><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">User Address</th></tr>`;

      html += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${this.user.name}</td><td style="border: 1px solid #ddd; padding: 8px;">${this.user.phone}</td><td style="border: 1px solid #ddd; padding: 8px;">${this.user.address}</td></tr>`;

      html += '<table style="border-collapse: collapse; width: 100%;"><tr><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">item Name</th><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Quantity</th><th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">TotalPrice</th></tr>';

      for (const item of data) {
        html += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${item.Name}</td><td style="border: 1px solid #ddd; padding: 8px;">${item.Quantity}</td><td style="border: 1px solid #ddd; padding: 8px;">${item.totalItemPrice}</td></tr>`;
      }

      html += '</table>';
      return html;
    }


    CheckOut()
    {
      console.log(this.user);

        const BodyData = this.items.map((item) => {
          return {
            Name: item.name,
            Quantity: item.quantity ,
            totalItemPrice: item.totalItemPrice
          };
          console.log(BodyData);

        });
        const htmlTable = this.generateHtmlTable(BodyData);

      this.dataToSend = {
      EmailToRestaurant:this.RestaurantEmail,
      RestaurantSubject:"New Order ",
      RestaurantBody:htmlTable,
      EmailToClient:this.user.email,
      ClientSubject:"Your Order had reserved",
      ClientBody:"<h1>Order will arrive as soon as possible</h1>" + htmlTable
    }
    const mail = this.user.email;
      this._SendMailService.SendMails(this.dataToSend)
      console.log(mail);

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
    const RestaurantEmail = localStorage.getItem('RestaurantEmail')!;
    this.RestaurantEmail = JSON.parse(RestaurantEmail);
    ;

    if (BasketItems) {
      this.data = JSON.parse(BasketItems);
      this.items = this.data.SelectedItems;
      this.RestaurantId = this.data.RestaurantId
      console.log(this.items);
    }


    const UserData = localStorage.getItem('UserData');
    if (UserData) {
      this.user = JSON.parse(UserData);
      console.log(this.user);
    }
    this.basketitems = this.items.map(item => ({...item, quantity:1 , totalItemPrice: 0}));
    this.items = this.basketitems;
    console.log(this.items);
    console.log(this.basketitems);



  }
}
