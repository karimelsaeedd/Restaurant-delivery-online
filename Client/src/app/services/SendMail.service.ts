import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {


  Url:string = environment.SendMailUrl

  constructor(private _HttpClient:HttpClient) { }

  SendMails(Data:any)
  {
    return this._HttpClient.post(this.Url, Data).subscribe({
      next() {
        console.log('Email sent successfully');
      },
      error(err) {
        console.error('Error sending email:', err);
      },
    });
  }

}
