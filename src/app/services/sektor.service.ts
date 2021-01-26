import { Injectable } from "@angular/core";
import { Sektor } from "../models/sektor";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Identifiers } from "@angular/compiler";

@Injectable()
export class SektorService {
    //private readonly API_URL = 'http://localhost:8083/sektor/';
    private readonly API_URL = 'http://localhost:8080/backend/sektor/';
    dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);

    constructor(private httpClient: HttpClient) { }


    public getAllSektori(): Observable<Sektor[]> {
        this.httpClient.get<Sektor[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addSektor(sektor: Sektor): void {
        this.httpClient.post(this.API_URL, sektor).subscribe();
    }

    public updateSektor(sektor: Sektor): void {
        this.httpClient.put(this.API_URL, sektor).subscribe();
    }

    public deleteSektor(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}
