import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

  show() {
    const circles = document.getElementsByClassName('center');
    if (circles.item(0).className == "center") {
      for (var i = 0; i < circles.length; i++) {
        circles.item(i).className += ' hidden';
      }
    }
    else {
      for (var i = 0; i < circles.length; i++) {
        circles.item(i).className = 'center';
      }
    }
  }



}
