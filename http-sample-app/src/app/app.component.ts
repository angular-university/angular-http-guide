import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpRequest} from "@angular/common/http";
import * as _ from 'lodash';


interface Course {
    description: string;
    courseListIcon:string;
    iconUrl:string;
    longDescription:string;
    url:string;
}

@Component({
  selector: 'app-root',
  template: `
  
      <ul *ngIf="courses$ | async as courses else noData">
          <li *ngFor="let course of courses">
              {{course.description}}
          </li>
          
      </ul>
      
      <ng-template #noData>No Data Available</ng-template>
      
  `})
export class AppComponent implements OnInit {

    courses$: Observable<Course>;

    constructor(private http:HttpClient) {

    }

    ngOnInit() {
/*
        this.courses$ = this.http
            .get("https://angular-http-guide.firebaseio.com/courses.json")
            .do(console.log)
            .map(data => _.values(data))

*/

        this.courses$ = this.http
            .request<Object>(new HttpRequest('GET', "https://angular-http-guide.firebaseio.com/courses.json", {responseType:'json'}))
            .map(data => _.values(data))
            .do(console.log);


    }

}
