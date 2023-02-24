import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
// import { Observable } from 'rxjs';

export interface Users{
  userName : string;
  emailId: string;
  img: string;
  password: string;
  role: string;
  spentAmount: number;
  totalAmount: number;
  userId: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  users : Users[] = [];
  userId : any;
  name : any;
  role : any;
  isPie : boolean = true;
  isDashbord : boolean = false;
  myChart : any;
  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) { }

  ngAfterViewInit(): void {
    this.name = window.localStorage.getItem('name')
    this.userId = window.localStorage.getItem('userId');
    this.role = window.localStorage.getItem('role');
    if(this.userId){
      this.getUsers();
    }
      else{
        this.router.navigate(['/login'])
      }
    }
    isDelete : boolean = false;
    clearData(){
      this.isDelete = true;
      let num = Math.floor(Math.random() * 10000).toFixed();
      let ans = window.prompt("enter number below "+num);
      if(num == ans){
        if(this.userId){
          const headers= new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*');
            this.httpClient.get('https://myroom-prashanthmaskuri009.b4a.run/deleteallproducts').subscribe((data : any)=>{
              alert("datelered Succesfully...");
              this.getUsers();
              this.isDelete = false;
            })
          }
      }
      else{
        alert("wrong number entered");
        this.isDelete = false;
      }
    }
    getUsers(){
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
        this.httpClient.get('https://myroom-prashanthmaskuri009.b4a.run/fetchAllUsers').subscribe((users : any)=>{
        let userid = window.localStorage.getItem('userId');
        let indx = users.findIndex((uesr:any)=>uesr.userId == userid);
        let loggedUser = users[indx];
        users.splice(indx,1);
        users.unshift(loggedUser);
        this.users = users;
          const canvas = <HTMLCanvasElement> document.getElementById('myChart');
          const ctx : any = canvas.getContext('2d');
          this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: users.map((item:any)=>{ return item.userName}),
                datasets: [{
                    label: 'Investment',
                    data: users.map((item:any)=>{ return item.spentAmount}),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(105, 180, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    // y: {
                    //     beginAtZero: false
                    // }
                }
            }
            })
            const canvas1 = <HTMLCanvasElement> document.getElementById('myChart1');
            const ctx1 : any = canvas1.getContext('2d');
            this.myChart = new Chart(ctx1, {
              type: 'pie',
              data: {
                  labels: users.map((item:any)=>{ return item.userName}),
                  datasets: [{
                      label: 'Investment',
                      data: users.map((item:any)=>{ return item.spentAmount}),
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(105, 180, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      // y: {
                      //     beginAtZero: false
                      // }
                  }
              }
              })
          this.myChart.data.labels = users.map((item:any)=>{ return item.userName});
          this.myChart.data.datasets[0].data = users.map((item:any)=>{ return item.spentAmount});
        })
      }
    getBill(){
      if(this.userId){
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
          this.httpClient.get('https://myroom-prashanthmaskuri009.b4a.run/orders/check/pdf').subscribe((users : any)=>{
            this.users = users;
          })
        }
    }
}
