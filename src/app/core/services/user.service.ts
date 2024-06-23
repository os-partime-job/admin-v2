import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../models/auth.models';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  httpOptions: any;

    constructor(private http: HttpClient) {
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
        }),
        "Access-Control-Allow-Origin": `${environment.backEndConfig.apiUrl}`,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

      };
    }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
  getAllUser(): Observable<any> {
    return this.http.get<any>(`${environment.backEndConfig.apiUrl}/shop/admin/account`, this.httpOptions);
  }
  updateUser(request:any): Observable<any> {
    return this.http.put<any>(`${environment.backEndConfig.apiUrl}/shop/admin/account/modify`,request, this.httpOptions);
  }
}
