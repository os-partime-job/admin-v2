import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =environment.backEndConfig.apiUrl;

  httpOptions: any;
  token : any;
  BASIC_DIAMOND_URL = "diamond/";
  BASIC_JEWELRY_URL = "jewelry/";


  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('currentUser')!)?.accessToken;
    console.log(this.token)
    this.httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ` + this.token,
    }),
    "Access-Control-Allow-Origin": `${environment.backEndConfig.apiUrl}`,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
}; }

  public getProducts(request: any): Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/jewelry/list`,request, this.httpOptions);
  }
  public getJewelryType():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/jewelry/jewelry_type`, this.httpOptions);
  }
  public addProduct(request : any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
    });
    return this.http.post(`${this.apiUrl}/jewelry/create`,request,{headers})
  }
  public updateProduct(request : any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
    });
    return this.http.post<any>(`${this.apiUrl}/jewelry/update`, request,{headers});
  }
  public deleteProduct(ProductId : number): Observable<any>{
    return this.http.delete<void>(`${this.apiUrl}/jewelry/delete/${ProductId}`,this.httpOptions);
  }
  public getTest(): Observable<any>{
    return this.http.get<Object>(`${this.apiUrl}/api/product/test`, this.httpOptions);
  }
  public getProductDetail(ProductId : number): Observable<any>{
    const body = {id_jewelry:ProductId};
    return  this.http.post<Object>(`${this.apiUrl}/${this.BASIC_JEWELRY_URL}detail`,body, this.httpOptions);
  }
}
