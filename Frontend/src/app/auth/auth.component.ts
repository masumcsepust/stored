import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface tokenObject{
  token:string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  authForm=new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  registerMode=false;

  constructor( private apiService: ApiService,
               private cookieService:CookieService,
               private router:Router ) { }

  ngOnInit() {
    const mrToken=this.cookieService.get('mr-token');
    if( mrToken )
    {
       this.router.navigate(['/movies']);
    }
  }
  saveForm(){
    if (! this.registerMode)
    {
      this.loginUser();
    }  
    else{
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          console.log(result)
        },
        error => console.log(error)
      );
    }
  }
  loginUser()
  {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result:tokenObject) => {
        this.cookieService.set('mr-token', result.token) 
        this.router.navigate(['/movies']);
    },
      error => console.log(error)
    )
  }

}
