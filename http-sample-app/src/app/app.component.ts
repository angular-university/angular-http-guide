import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import * as _ from 'lodash';



interface Course {
    description: string;
    courseListIcon: string;
    iconUrl: string;
    longDescription: string;
    url: string;
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

        <button (click)="httpPutExample()">PUT Request</button>

        <button (click)="httpPatchExample()">PATCH Request</button>

        <button (click)="httpDeleteExample()">DELETE Request</button>

        <button (click)="httpPostExample()">POST Request</button>

        <button (click)="duplicateRequestsExample()">Duplicate Requests</button>
        
        <button (click)="parallelRequests()">Parallel</button>
        
        <button (click)="sequentialRequests()">Sequential</button>

    `
})
export class AppComponent implements OnInit {

    courses$: Observable<Course>;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {

        // Simple HTTP GET
        this.courses$ = this.http
            .get("https://angular-http-guide.firebaseio.com/courses.json")
            .do(console.log)
            .map(data => _.values(data));

        // Examples of GET with parameters and headers
        //const params = new HttpParams()
        //    .set('orderBy', '"$key"')
        //    .set('limitToFirst', "1");

        // const params = new HttpParams({fromString: 'orderBy="$key"&limitToFirst=1'});

        // const params = new HttpParams({fromString: 'orderBy="$key"&limitToFirst=1'});

        // const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");

        // this.courses$ = this.http
        //   .get(
        //        "https://angular-http-guide.firebaseio.com/courses.json",
        //        {headers})
        //    .do(console.log)
        //    .map(data => _.values(data));
    }

    httpPutExample() {

        const headers = new HttpHeaders().set("Content-Type", "application/json");

        this.http.put("https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json",
            {
                "courseListIcon": "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png",
                "description": "Angular Tutorial For Beginners TEST",
                "iconUrl": "https://angular-academy.s3.amazonaws.com/thumbnails/angular2-for-beginners.jpg",
                "longDescription": "...",
                "url": "new-value-for-url"
            },
            {headers})
            .subscribe(
                (val) => {

                    console.log("PUT call successful value returned in body", val);

                },
                response => {

                    console.log("PUT call in error", response);

                },
                () => {

                    console.log("The PUT observable is now completed.");
                }
            );

    }

    httpPatchExample() {

        this.http.patch("https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json",
            {
                "description": "Angular Tutorial For Beginners PATCH TEST",
            })
            .subscribe(
                (val) => {

                    console.log("PATCH call successful value returned in body", val);

                },
                response => {

                    console.log("PATCH call in error", response);

                },
                () => {

                    console.log("The PATCH observable is now completed.");
                });


    }

    httpDeleteExample() {

        this.http.delete("https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json")
            .subscribe(
                (val) => {
                    console.log("DELETE call successful value returned in body", val);
                },
                response => {
                    console.log("DELETE call in error", response);
                },
                () => {
                    console.log("The DELETE observable is now completed.");
                });

    }

    httpPostExample() {


        this.http.post("https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json",
            {
                "courseListIcon": "...",
                "description": "TEST",
                "iconUrl": "..",
                "longDescription": "...",
                "url": "new-url"
            })
            .subscribe(
                (val) => {
                    console.log("POST call successful value returned in body", val);
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });

    }


    duplicateRequestsExample() {

        const httpGet$ = this.http
            .get("https://angular-http-guide.firebaseio.com/courses.json")
            .map(data => _.values(data))
            .shareReplay();

        httpGet$.subscribe(
            (val) => console.log("logging GET value", val)
        );

        this.courses$ = httpGet$;
    }



    parallelRequests() {

        const parallel$ = Observable.forkJoin(
            this.http.get('https://angular-http-guide.firebaseio.com/courses/-KgVwEBq5wbFnjj7O8Fp.json'),
            this.http.get('https://angular-http-guide.firebaseio.com/courses/-KgVwECOnlc-LHb_B0cQ.json')
        );

        parallel$.subscribe(
            values => {
                console.log("all values", values)
            }
        );
    }

    sequentialRequests() {

        const sequence$ = this.http.get<Course>('https://angular-http-guide.firebaseio.com/courses/-KgVwEBq5wbFnjj7O8Fp.json')
            .switchMap(course => {

                course.description+= ' - TEST ';

                return this.http.put('https://angular-http-guide.firebaseio.com/courses/-KgVwEBq5wbFnjj7O8Fp.json', course)
            },
                (firstHTTPResult, secondHTTPResult)  => [firstHTTPResult, secondHTTPResult]);


        sequence$.subscribe(values => console.log("result observable ", values) );
    }

}
