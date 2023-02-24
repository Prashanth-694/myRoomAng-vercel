import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {
  six_digit_otp : number = 0;
  email : string = "";
  @ViewChild('prmEmail') prmEmail : ElementRef | any;
  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  isOtpSent = false;
  isSubmit = false;
  otp :number|undefined;
  pwd1 : string = "";
  pwd2 : string = "";
  getOtp(){
    console.log("prmEmail",this.prmEmail);
    this.six_digit_otp = Math.floor(100000 + Math.random() * 900000);
    let obj = {
      emailId : this.email,
      otp : this.six_digit_otp
    };
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
      this.httpClient.post(`https://myroom-prashanthmaskuri009.b4a.run/sendOtp`,obj,{headers : headers }).subscribe((details : any)=>{
    })
    setTimeout(() => {
      this.six_digit_otp = 0;
    }, 300000);
    this.isOtpSent = true;
    this.isSubmit = true;
  }
  changePwd = false;
  submitOtp(){
    if(this.six_digit_otp === this.otp){
      this.changePwd = true;
    }
    else{
      alert("Wrong OTP entered")
    }
  }
  confirmOtp(){
    if(this.pwd1 === this.pwd2){
      let obj = {
        emailId : this.email,
        password : this.pwd2
      };
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
        this.httpClient.post(`https://myroom-prashanthmaskuri009.b4a.run/updatePwd`,obj,{headers : headers }).subscribe((data : any)=>{
          if(data){
            this.router.navigate(['/login']);
          }
      })
    }
    else{
      alert("Not matched or invalid...")
    }
  }
}
