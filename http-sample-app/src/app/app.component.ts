import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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


        // Simple HTTP GET
//        this.courses$ = this.http
//            .get("https://angular-http-guide.firebaseio.com/courses.json")
//            .do(console.log)
//            .map(data => _.values(data));







        //
        //const params = new HttpParams()
        //    .set('orderBy', '"$key"')
        //    .set('limitToFirst', "1");

        //
        //const params = new HttpParams({fromString: 'orderBy="$key"&limitToFirst=1'});

        const params = new HttpParams({fromString: 'orderBy="$key"&limitToFirst=1'});

        const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");

        this.courses$ = this.http
            .get(
                "https://angular-http-guide.firebaseio.com/courses.json",
                {headers})
            .do(console.log)
            .map(data => _.values(data));




    }

}
