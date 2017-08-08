# Angular HTTP Quickstart Guide

This repository contains a sample Angular HTTP application that uses the latest Angular HTTP Client, originally released in Angular 4.3 (import barrel `@angular/common/http`).

This is the support code for the [Angular HTTP QuickStart](http://blog.angular-university.io/angular-http) blog post.

This post will be a quick practical guide for the Angular HTTP Client module. We will cover how to do HTTP in Angular in general. We will be using the new @angular/common/http module, but a good part of this post is also applicable to the previous @angular/http module.

We will provide some examples of how to use this module to implement some of the most common uses that you will find during development.

# Table Of Contents
- Introduction to the new HTTP Client module
- Example of an HTTP GET
- Improved Type Safety
- HTTP Request Parameters (Immutability-based API)
- HTTP Headers (Immutability-based API)
- HTTP PUT, PATCH, POST, DELETE
- Some REST Guidelines (specific to RESTful JSON) for using the multiple HTTP methods
- The use of Generics in the new API enabling more type safe code
- How To Avoid Duplicate HTTP Requests
- How to do HTTP Requests in Parallel, and combine the Result
- How to do HTTP Requests in sequence, and use the result of the first request to create the second request
- How To get the results of two requests made in sequence
- HTTP error handling
- HTTP Interceptors
- Progress Events
- Summary
