import { Component, OnInit } from '@angular/core';
import { BackEndServiceService } from '../back-end-service.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Objs } from '../Objs'
import { promise } from 'protractor';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id : String
  login : Boolean = false;
  slideNo = 0;
  object : Objs;
  imgArr : FileList;
  editing : Boolean = true;

  title : String;
  date : Date;
  content :  String;
  desc :  String;
  field :  String;
  imgURL: any[] = [];

  constructor(
    private bes : BackEndServiceService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    

    this.bes.getIt(this.id).subscribe((data) => {
      this.object = data;
    });

    await new Promise(r => setTimeout(r, 2000));
    this.title = this.object.title;
    this.date = this.object.date;
    this.content = this.object.content;
    this.desc = this.object.description;
    this.field = this.object.field; 
    this.imgArr = this.object.image;
    console.log(this.imgArr + " jbi");
    

    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        this.slideShow(this.slideNo);
      }
    }, 1000);
    
    
    this.login = this.bes.isLoggedIn();

    this.imgURL = this.object.image;
  }

  changeSlide(n : number) {
    this.slideShow(this.slideNo += n);
  }

  slideShow(n : number) {
    var i = 0;
    var slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLDivElement>;
    var dots = document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLDivElement>;
    if (n > slides.length -1) {
      n = 0;
    }
    if (n < 0) {
      n = slides.length - 1;
    }
    this.slideNo = n;
    for ( i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[this.slideNo].style.display = 'block';
  }

  edit() {
    this.editing = true;
  }

  addImage(files: any[]) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      reader.readAsDataURL(files[i]);
    }
    reader.onload = (_event) => {
      this.imgURL.push(reader.result);
      console.log(reader.result);
      
    }
  }

  removeImage(img : WindowBase64) {
    this.imgURL.splice(this.imgURL.indexOf(img), 1);
  }

  upload() {
    this.object = {
      title : this.title,
      date : this.date,
      content : this.content,
      description : this.desc,
      field : this.field,
      image : this.imgURL
    }    
    this.bes.updateIt(this.id,this.object);
    this.editing = false;
    this.ngOnInit();
  }

  delete() {
    this.bes.deleteIt("0");
    this.router.navigateByUrl("/search");
  }

}
