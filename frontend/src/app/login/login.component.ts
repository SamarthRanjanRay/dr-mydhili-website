import { Component, OnInit } from '@angular/core';
import { BackEndServiceService } from '../back-end-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usn : String;
  pass : String;
  login : Boolean = false;
  constructor(
    private bes : BackEndServiceService,
  ) { }

  ngOnInit() {
  }

  loging() {
    this.login = this.bes.login({username : this.usn, password : this.pass});
  }

}
