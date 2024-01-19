import { Component, OnInit } from '@angular/core';
import { product } from 'src/data-type';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {
  }
  currentDate = new Date();
  time = this.currentDate.getHours();

   ngOnInit(): void {
     this.product.popularProducts().subscribe((data)=>{
       this.popularProducts=data;
     })

     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
       if(this.time==11){
       data.forEach((item) => {
        if (item.price) {
          item.price=item.price/2
        }
      })}
     })
   }
  //  discount(){
  //   this.price=price/2;
  //  }
 }
