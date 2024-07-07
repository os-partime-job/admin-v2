import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOptions: any;
  httpOptions2: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
      }),
      "Access-Control-Allow-Origin": `${environment.backEndConfig.apiUrl}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

    };
    this.httpOptions2 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
      }),
      "Access-Control-Allow-Origin": `${environment.backEndConfig.apiPayment}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

    };
  }

  addOrder(request: any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiUrl}/order/add_order`, request, this.httpOptions);
  }

  getAllOrder(request: any): Observable<any> {
    return this.http.post<any[]>(`${environment.backEndConfig.apiUrl}/order/list`, request, this.httpOptions);
  }

  getCallPaymentVnPay(request: any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiPayment}/v1/payment/vnp/create`, request, this.httpOptions2);
  }

  getCallPaymentStrip(request: any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiPayment}/v1/payment/stripe/create`, request, this.httpOptions2);
  }

  getOrdersAllUser(request: any): Observable<any> {
    return this.http.post(`${environment.backEndConfig.apiUrl}/order/list_all_user`, request, this.httpOptions)
  }

  addDeliveryToOrder(request: any): Observable<any> {
    return this.http.post(`${environment.backEndConfig.apiUrl}/delivery/add-update`, request, this.httpOptions);
  }

  updateStatusOrder(request: any): Observable<any> {
    return this.http.post(`${environment.backEndConfig.apiUrl}/order/update`, request, this.httpOptions);
  }

  getAllVoucher(): Observable<any> {
    return this.http.get<any[]>(`${environment.backEndConfig.apiUrl}/shop/coupon/all`, this.httpOptions)
  }

  addVoucher(request: any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiUrl}/shop/coupon/add`, request, this.httpOptions)
  }

  updateVoucher(request: any): Observable<any> {
    return this.http.put<any>(`${environment.backEndConfig.apiUrl}/shop/coupon/modify`, request, this.httpOptions)
  }

  deleteVoucher(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.backEndConfig.apiUrl}/shop/coupon/deactivate?code=${id}`, this.httpOptions)
  }

  useVoucher(request: any): Observable<any> {
    return this.http.put<any>(`${environment.backEndConfig.apiUrl}/shop/coupon/use`, request, this.httpOptions)
  }

  getInfoDashBoard(): Observable<any> {
    return this.http.get(`${environment.backEndConfig.apiUrl}/order/dashboard`, this.httpOptions);
  }

  getAllSales(request: any): Observable<any> {
    return this.http.post(`${environment.backEndConfig.apiUrl}/order/sale_info`, request, this.httpOptions)
  }

  getDetailSale(request: any): Observable<any> {
    return this.http.post(`${environment.backEndConfig.apiUrl}/order/sale_detail`, request, this.httpOptions)
  }
  getInvoice(id:string): Observable<any> {
    return this.http.get<any>(`${environment.backEndConfig.apiUrl}/order/get_invoice?orderId=${id}`,this.httpOptions)
  }
  getInvoiceDetail(request:any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiUrl}/order/invoice_detail`,request,this.httpOptions)
  }
  getGIAInfo(request:any): Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiUrl}/order/gia_info`,request,this.httpOptions)
  }
}
