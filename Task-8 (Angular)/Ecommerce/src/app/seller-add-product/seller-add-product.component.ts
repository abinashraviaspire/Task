import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Status, product } from 'src/data-type';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment.development';



@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string|undefined;
  frm!:FormGroup;
  // product:Product = {id:0,productName:'',productImage:''};
  image?:File;
  status!:Status;
  productService: any;
  constructor(private product:ProductService,private http:HttpClient, private fb:FormBuilder) { }

  ngOnInit():void {
    this.frm = this.fb.group({
      'id':[0],
      'productName':['',Validators.required],
      'imageFile':[]
    })
  }
  submit(data: product) {

    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
      if(result){
        this.addProductMessage=environment.product.AddProductMessage;
      }
    });

    setTimeout(()=>{
      this.addProductMessage=undefined
    },3000)
}

get f(){
  return this.frm.controls;
}
onPost(){
  this.status= {statusCode:0,message:'wait..'};

  const frmData:product= Object.assign(this.frm.value);
  frmData.image=this.image;
  // we will call our service, and pass this object to it
  this.productService.add(frmData).subscribe({
    next:(res: Status)=>{
      this.status=res;
    },
    error: (err: any)=>{
     this.status= {statusCode:0,message:'Error on server side'}
      console.log(err);
    }
  });
}

onChange(event:any){
 this.image=event.target.files[0];
}



}
