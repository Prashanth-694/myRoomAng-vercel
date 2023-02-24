import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details : any;
  userId : any;
  searchResults : any;
  searchControl = new FormControl('');
  constructor(
    private httpClient : HttpClient,
    private route : ActivatedRoute,
    private router : Router,
    private commonService : CommonService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((val)=>{
      if(val){
        val = val.toLocaleLowerCase()
        this.searchResults = this.details.filter((item:any)=>{
          if(item.itemName.toLocaleLowerCase().includes(val) || item.amount.toString().toLocaleLowerCase().includes(val) || item.description.toLocaleLowerCase().includes(val)){
              return item;
          }
        })
      }
      else{
        this.searchResults = [...this.details];
      }
    })
    this.userId = window.localStorage.getItem('userId');
    if(this.userId){
      let id;
      this.route.params.subscribe(params => {
        id = params['id'];
      });
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
        this.httpClient.get(`https://myroom-prashanthmaskuri009.b4a.run/${id}`,{ 'headers': headers }).subscribe((details : any)=>{
        this.details = details;
        this.searchResults = details;
        });
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date:any) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  
  updateOrDelete(detail:any){
    console.log(detail);
    this.commonService.formObj = detail;
    window.localStorage.setItem('obj',JSON.stringify(detail));
    this.router.navigate(['/addForm/update']);
    // alert("comming soon!");
  }
  delete(details:any){
    let isDelete = window.confirm("Are you sure you want to delete...!");
    if(isDelete){
      let obj = {
        id : details.id,
      }
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
        this.httpClient.post(`https://myroom-prashanthmaskuri009.b4a.run/deleteById`,obj,{ 'headers': headers }).subscribe((details : any)=>{
          if(details){
            this.router.navigate(['/home']);
          } 
        });
    }
  }

}
