import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import {AuthInterceptor} from "./auth-interceptor";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
