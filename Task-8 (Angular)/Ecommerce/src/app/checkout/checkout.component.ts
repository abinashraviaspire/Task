// import { Component, OnInit } from '@angular/core';
// import { cart, order } from 'src/data-type';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {

//   totalPrice: number | undefined;
//   cartData: cart[] | undefined;
//   orderMsg: string | undefined;
//   constructor(private product: ProductService, private router: Router) { }

//   ngOnInit(): void {
//     this.product.currentCart().subscribe((result) => {

//       let price = 0;
//       this.cartData = result;
//       result.forEach((item) => {
//         if (item.quantity) {
//           price = price + (+item.price * +item.quantity)
//         }
//       })
//       this.totalPrice = price + (price / 10) + 100 - (price / 10);

//       console.warn(this.totalPrice);

//     })

//   }
//   orderNow(data: { email: string, address: string, contact: string }) {
//     let user = localStorage.getItem('user');
//     let userId = user && JSON.parse(user).id;
//     if (this.totalPrice) {
//       let orderData: order = {
//         ...data,
//         totalPrice: this.totalPrice,
//         userId,
//         id: undefined
//       }

//       this.cartData?.forEach((item) => {
//         setTimeout(() => {
//           item.id && this.product.deleteCartItems(item.id);
//         }, 700)
//       })

//       this.product.orderNow(orderData).subscribe((result) => {
//         if (result) {
//           console.warn(orderData);
//           this.orderMsg = "Order has been placed";
//           setTimeout(() => {
//             this.orderMsg = undefined;
//             this.router.navigate(['/my-orders'])
//           }, 4000);

//         }

//       })
//     }

//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from 'src/data-type';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })

  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg =environment.ordermessage;
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }

}
