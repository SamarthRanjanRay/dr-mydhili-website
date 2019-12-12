import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {
  configUrl = "http://localhost:3000/";
  obj : Object;

  constructor(
    private http : HttpClient
  ) { }

  login(usn : String, pass : String) {
    return this.http.get(this.configUrl+'/login/'+usn+'/'+pass);
  }

  get(para : String[]) {
    if (para)
      return this.http.get(this.configUrl+'/get/'+para.toString());
    else 
      return this.http.get(this.configUrl+'/getAll');
  }

  postIt(arr : String[]) {
    this.obj = { array : arr };
    return this.http.post(this.configUrl+'/post',this.obj).subscribe((data) => {
      return data;
    });
  }

  updateIt(arr : String[]) {
    this.obj = { array : arr };
    return this.http.patch(this.configUrl+'/patch',this.obj).subscribe((data) => {
      return data;
    });
  }

  deleteIt(id : Number) {
    return this.http.delete(this.configUrl+'/delete/'+id);
  }

  getIt(id : Number) {
    return this.http.get(this.configUrl+'/getOne/'+id);
  }
}
