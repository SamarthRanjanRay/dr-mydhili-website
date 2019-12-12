import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackEndServiceService } from '../back-end-service.service';

@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.css']
})
export class ViewOneComponent implements OnInit {
  arr : Object = {};
  id : Number;

  constructor(
    private bes : BackEndServiceService,
    private route : ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.bes.getIt(this.id).subscribe(data => {
      this.arr = data;
      console.log(this.arr);
    });
  }

}
