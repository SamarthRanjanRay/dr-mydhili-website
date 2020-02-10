import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackEndServiceService } from '../back-end-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchtype : String[] = [];
  searchdate : String[] = [];
  object : Object;
  arrrr : any;
  loggedIn : Boolean;
  type : String;
  searchText : String

  constructor(
    private bes : BackEndServiceService,
    private route : ActivatedRoute
    ) { 

    }

  ngOnInit() {
    if (this.object == null) {
      this.route.params.subscribe(params => {
        this.searchtype.push(params['type']);
        this.type = params['type'];
      });
      
    }
      this.object = {
        type : this.searchtype,
        date : this.searchdate
      }
      this.bes.get(this.object).subscribe(data => {
        this.arrrr = data;
        console.log(this.arrrr);
        
      });
      

    // this.arrrr = [
    //   {
    //     id : 420,
    //     title : "shitpostin1",
    //     desc : "this more than just shitposting",
    //     date : new Date()
    //   },
    //   {
    //     id : 69,
    //     title : "shitpostin2",
    //     desc : "this more than just shitposting. its like over 9000",
    //     date : new Date()
    //   }]

      var ele = document.getElementById(this.type.toString()) as HTMLButtonElement;
      ele.className += " active"
      
  }

  makeArr(name : String) {
    var ele = document.getElementById(name.toString()) as HTMLButtonElement;
    if (!this.searchtype.includes(name)) {
      this.searchtype.push(name);
      ele.className += " active"
    }
    else {
      this.searchtype.splice(this.searchtype.indexOf(name),1)
      ele.className = ""
    }
    console.log(this.searchtype);
    
  }

  checkAuth() {
    return this.bes.isLoggedIn()
  }

  submitReq() {
    this.object = {
      type : this.searchtype,
      date : this.searchdate
    }
    console.log(this.object);
    
    this.bes.get(this.object).subscribe(data => {
      this.arrrr = data;
    });
    this.ngOnInit();
  }

}
