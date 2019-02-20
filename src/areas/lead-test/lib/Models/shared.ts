import { Component } from '@angular/core';

 export class CommonResponse{
   Total:number;
  Status:number;
  Message:string;
  Data:any;
  constructor(Status:number=0,Message:string=null,Total:number=null,Data:any=null){
    this.Total=Total;
    this.Status=Status;
    this.Message= Message;
    this.Data = Data;
  }
 }

 export class pagingfilter{
  Page:number;
  PageSize:number;
  Sort:string;
  SortDirection:string;
  Email:string;
  Query:any;
 constructor(query:string=null,email:string=null,page:number=1,pagesize:number=10,sort:string='',
 sortdir:string='ASC'){
   this.Query=query;
   this.Email=email;
   this.Page= page;
   this.PageSize = pagesize;
   this.Sort = sort;
   this.SortDirection = sortdir;
 }
}
