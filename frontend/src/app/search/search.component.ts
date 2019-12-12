import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackEndServiceService } from '../back-end-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchparam : String[] = [];
  list : Object = {};

  constructor(
    private bes : BackEndServiceService,
    private route : ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchparam = params['para'];
    });
    this.bes.get(this.searchparam).subscribe(data => {
      this.list = data;
    });
  }

}
