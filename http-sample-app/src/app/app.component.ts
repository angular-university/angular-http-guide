import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

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

    courses$: Observable<any>;

    constructor(private http:HttpClient) {

    }

    ngOnInit() {

        this.courses$ = this.http
            .get("https://angular-http-guide.firebaseio.com/courses.json")
            .map(res => _.values(res))
            .do(console.log);

    }

}
