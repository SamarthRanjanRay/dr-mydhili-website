import { Component, OnInit } from '@angular/core';
import { BackEndServiceService } from '../back-end-service.service';
import { Router } from '@angular/router'
import { Objs } from '../Objs'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  title : String;
  date : Date;
  content :  String;
  desc :  String;
  field :  String;
  imgURL: any[] = [];
  obj : Objs;


  constructor(
    private bes : BackEndServiceService,
    private route : Router
  ) { }

  ngOnInit() {
    this.addImage([]);
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
    this.obj = {
      title : this.title,
      date : this.date,
      content : this.content,
      description : this.desc,
      field : this.field,
      image : this.imgURL
    }
    this.bes.postIt(this.obj)
    this.route.navigateByUrl('/search/'+this.obj.content);
  }

}
