import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = "http://localhost:8080"

  constructor( private http: HttpClient ) { }



  registerUser(user) {
    return this.http.post('http://localhost:8080/authentication/register', user)
  //http://localhost:8080/authentication/register
    
  //return this.http.post(`${this.domain}/authentication/register`, user)
  
}
  
  
}