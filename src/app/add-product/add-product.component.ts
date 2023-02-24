import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';

export interface User{
  userId: number;
  itemName: string;
  description: string;
  amount: number;
  createdDate: string;
  id? : string
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private httpClient : HttpClient,
    private router : Router,
    private routerA : ActivatedRoute,
    private commonSerive : CommonService
  ) { }
  isSumit = false;
  isUpdate = false;
  product : any;
  purpose: any;
  amount : any;
  date : any;
  userId : any;
  id : any;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('userId');
    if(!this.userId){
        this.router.navigate(['/login'])
    }
    this.routerA.params.subscribe(params => {
        let type = params['val'];
        if(type === 'update'){
          if(!this.commonSerive.formObj){
            this.commonSerive.formObj = JSON.parse(window.localStorage.getItem('obj') as any);
          }
          this.isUpdate = true;
          let obj = this.commonSerive.formObj;
          this.product = obj.itemName;
          this.amount = obj.amount;
          this.date = obj.createdDate;
          this.purpose = obj.description;
          this.userId = obj.userId;
          this.id = obj.id;
        }
        else{
          this.isUpdate = false;
        }
    });
  }
  Submit(isUpdate = false){
    this.isSumit = true;
    if(this.product && this.purpose && this.amount && this.date){
      this.userId = window.localStorage.getItem('userId');
      var formObj : User = {
        userId: parseInt(this.userId),
        itemName: this.product,
        description: this.purpose,
        amount: this.amount,
        createdDate: this.date,
    }
    isUpdate ? formObj.id = this.id : null;
    let endPoint = !isUpdate ? 'insertProductDetails' : 'updateproductDetails';
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
      this.httpClient.post(`https://myroom-prashanthmaskuri009.b4a.run/${endPoint}`,formObj,{headers : headers }).subscribe((details : any)=>{
        if(details){
          this.commonSerive.formObj = {};
          window.localStorage.removeItem('obj');
          this.isSumit = false;
          this.router.navigate(['/home']);
        }
        else{
          this.commonSerive.formObj = {};
          window.localStorage.removeItem('obj');
          this.isSumit = false;
          this.router.navigate(['/home']);
        }
      });
    }
    else{
      this.isSumit = false;
      alert("fill all details");
    }
  }
  update(){
    console.log("updated clicked");
    this.Submit(true);
  }
}
