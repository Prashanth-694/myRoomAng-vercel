import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = false;
  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) { }
  email : string = "";
  password : string = "";
  userObj : any;
  showPwd = false;
  ngOnInit(): void {
    if(window.localStorage.getItem('userId')){
      this.router.navigate(['/home']);
    }
  }
  showHidePwd(){
    this.showPwd = !this.showPwd;
  }
  login(){
    this.isLogin = true;
    if(this.email && this.password){
      let obj = {
        emailId : this.email,
        password : this.password
      }
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      // .set('Access-Control-Allow-Origin', '*');
        this.httpClient.post(`https://myroom-prashanthmaskuri009.b4a.run/validUser`,obj,{headers : headers }).subscribe((details : any)=>{
        if(details){
          this.isLogin = false;
          this.userObj = details;
          window.localStorage.setItem('userId', details.userId);
          window.localStorage.setItem('name', details.userName);
          window.localStorage.setItem('img', details.img);
          window.localStorage.setItem('role', details.role);
          this.router.navigate(['/home']);
        }
        else{
          this.isLogin = false;
          alert("wrong credentials");
        }  
      });
        
    }
    else{
      this.isLogin = false;
      alert("something wrong...!")
    }
  }
}
