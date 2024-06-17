import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliverService{
  httpOptions: any;
  httpOptions2: any;
  constructor( private router: Router,
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
  getAllDelivery():Observable<any> {
    return this.http.get<any[]>(`${environment.backEndConfig.apiUrl}/delivery/list-deliver`,this.httpOptions);
  }
  updateStatusDelivery(request: any):Observable<any> {
    return this.http.post<any>(`${environment.backEndConfig.apiUrl}/delivery/update-deliver`,request,this.httpOptions);
  }
}
