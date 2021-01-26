import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Radnik } from '../models/radnik';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RadnikService {
 radnikService: RadnikService;
 //private readonly API_URL = 'http://localhost:8083/radnik/';
 private readonly API_URL = 'http://localhost:8080/backend/radnik/';
 //private readonly API_URL_BYID = 'http://localhost:8083/radnikZaSektorId/';
 private readonly API_URL_BYID = 'http://localhost:8080/backend/radnikZaSektorId/';

dataChange: BehaviorSubject<Radnik[]> = new BehaviorSubject<Radnik[]>([]);

 constructor(private httpClient: HttpClient) { }

 public getRadnici(): Observable<Radnik[]> {
  this.httpClient.get<Radnik[]>(this.API_URL).subscribe(data => {
    this.dataChange.next(data);
  },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  return this.dataChange.asObservable();
}

 public getRadniciZaSektor(idSektora): Observable<Radnik[]> {
   this.httpClient.get<Radnik[]>(this.API_URL_BYID + idSektora).subscribe(data => {
     this.dataChange.next(data);
   },
     (error: HttpErrorResponse) => {
       console.log(error.name + ' ' + error.message);
     });
   return this.dataChange.asObservable();
 }

 public addRadnik(radnik: Radnik): void {
   this.httpClient.post(this.API_URL, radnik).subscribe();
 }

 public updateRadnik(radnik: Radnik): void {
   this.httpClient.put(this.API_URL, radnik).subscribe();
 }

 public deleteRadnik(id: number): void {
   this.httpClient.delete(this.API_URL + id).subscribe();
 }
}
