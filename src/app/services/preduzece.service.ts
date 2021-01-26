import { Injectable } from "@angular/core";
import { Preduzece } from "../models/preduzece";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Identifiers } from "@angular/compiler";


@Injectable()
export class PreduzeceService {
    //private readonly API_URL = 'http://localhost:8083/preduzece/';
    private readonly API_URL = 'http://localhost:8080/backend/preduzece/';
    dataChange: BehaviorSubject<Preduzece[]> = new BehaviorSubject<Preduzece[]>([]);
    //privremeno cuvanje podataka iz dijaloga
    private dialogData: any;

    constructor(private httpClient: HttpClient) { }

    public getAllPreduzece(): Observable<Preduzece[]> {
        this.httpClient.get<Preduzece[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addPreduzece(preduzece: Preduzece): void {
        this.httpClient.post(this.API_URL, preduzece).subscribe();
    }

    public updatePreduzece(preduzece: Preduzece): void {
        this.httpClient.put(this.API_URL, preduzece).subscribe();
    }

    public deletePreduzece(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}
