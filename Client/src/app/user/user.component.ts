import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  userForm:FormGroup = new FormGroup({
    'name': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'phone': new FormControl(null,[Validators.required,Validators.pattern(/^\+20(1|0)\d{9}$/)]),
    'email': new FormControl(null,[Validators.required,Validators.email]),
    'address': new FormControl(null,[Validators.required])
  });

  submitForm()
  {
    const data = this.userForm.value;
    localStorage.setItem('userData',JSON.stringify(data));
  }

  ngOnInit(): void {
  }

}
