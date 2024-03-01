import { Component } from '@angular/core';
import { HttpService } from './Services/http.service';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location: Location, private activeRoute:ActivatedRoute, private route:Router){
    this.getStatus()
  }

  ngOnInit(){
    this.route.events.subscribe((event)=>{
     if (event instanceof NavigationEnd) {
        this.getStatus()
      } })
  }

  goBack(){
    this.location.back();
  }

  status=true

  getStatus(){
    if(this.route.url=='/Home' || this.route.url=='/'){
      this.status=false
    }else{
      this.status=true
    }
  }


  title = 'hms';
}
