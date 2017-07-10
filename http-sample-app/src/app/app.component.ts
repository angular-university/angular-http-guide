import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  template: `
  
      <ul>
          <li *ngFor="let course of courses$ | async">
              {{course.description}}
          </li>
          
      </ul>
      
  
  `,
  styleUrls: ['./app.component.css']
})
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
