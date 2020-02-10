import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objs } from './Objs';

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {
  configUrl = "http://localhost:2000/";
  loggedIn : Boolean = true;

  constructor(
    private http : HttpClient
  ) { }

  login(object : Object) {
    
    this.http.post(this.configUrl+'login', object).subscribe((data) => {
      this.loggedIn = Boolean(data);
    });
    return this.loggedIn;
  }

  get(object : Object) {
    return this.http.post(this.configUrl+"all", object);
  }

  postIt(object : Object) {
     return this.http.post(this.configUrl, object).subscribe((data) => {
      return data;
    });
  }

  updateIt(id : String, object : Object) {
    return this.http.put(this.configUrl+id, object).subscribe((data) => {
      return data;
    });
  }

  deleteIt(id : String) {
    return this.http.delete(this.configUrl+'delete/'+id).subscribe((data) => {
      return data
    });
  }

  getIt(id : String) : Observable<Objs>{
    return this.http.get<Objs>(this.configUrl+id);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
