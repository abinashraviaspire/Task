import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Status, cart, order, product } from 'src/data-type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }
 private baseUrl = environment.baseUrl;
  // private baseUrl = 'http://localhost:5285';
  // addProduct(data:product){
  //   let formData = new FormData();
  //   formData.append("productName",data.name);
  //   formData.append("imageFile",data.image??"");
  //   return this.http.post<Status>(this.baseUrl+'/addProduct',formData);
  // }
  addProduct(data:product){
    return this.http.post(`${this.baseUrl}/products`,data);
  }
  productList(){
    return this.http.get<product[]>(`${this.baseUrl}/products`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`${this.baseUrl}/products/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put<product>(`${this.baseUrl}/products/${product.id}`,product);
  }
  popularProducts() {
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=8`);
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(`${this.baseUrl}/products?q=${query}`);
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post(`${this.baseUrl}/cart`, cartData);
  }
  updateCart(cartData: cart) {
    return this.http.put<cart>(`${this.baseUrl}/cart?${cartData.id}`,cartData);
  }
  getCartList(userId: number) {
    return this.http.get<product[]>(`${this.baseUrl}/cart?userId=` + userId, {observe: 'response',})
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(`${this.baseUrl}/cart/`+ cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.baseUrl}/cart?userId=` + userData.id);
  }

  orderNow(data: order) {
    return this.http.post(`${this.baseUrl}/orders`,data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.baseUrl}/orders?userId=` + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.baseUrl}/cart/` + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete(`${this.baseUrl}/orders/`+orderId)

  }
}
