import { Component } from '@angular/core';
import { HttpService } from './Services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location: Location){}

  goBack(){
    this.location.back();
  }


  title = 'hms';
}
