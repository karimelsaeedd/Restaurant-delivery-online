import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _Router:Router, private _Location:Location) { }

  userForm:FormGroup = new FormGroup({
    'name': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'phone': new FormControl(null,[Validators.required,Validators.pattern(/^\+?\d{11,12}$/)]),
    'email': new FormControl(null,[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
    'address': new FormControl(null,[Validators.required])
  });

  submitForm()
  {
    const data = this.userForm.value;
    localStorage.setItem('UserData',JSON.stringify(data));
    this._Router.navigateByUrl('/basket')
  }

  goBack()
  {
    this._Location.back()
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('UserData');
    if (storedData) {
      this.userForm.setValue(JSON.parse(storedData));
    }
  }

}
