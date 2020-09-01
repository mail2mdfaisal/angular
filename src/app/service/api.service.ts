import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';
import { User } from '../model/user.model';

@Injectable({
  providedIn:'root'
})
export class ApiService {

  private baseUrl:string="http://localhost:8080/user/";

  constructor(private http:HttpClient) { }

  public login(loginData):Observable<any> {
    return this.http.post<any>(this.baseUrl+"login",loginData);
  }

  public getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl+"users");
  }

  public createUser(userdata):Observable<any>{
    return this.http.post<any>(this.baseUrl+"add",userdata);
  }

  public getUserById(userId):Observable<any> {
    return this.http.get<any>(this.baseUrl+"user/"+userId);
  }
  public updateUser(userData):Observable<any> {
    return this.http.post<any>(this.baseUrl+"update",userData);
  }
}
