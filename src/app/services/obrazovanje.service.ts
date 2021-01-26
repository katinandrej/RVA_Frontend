import { Injectable } from "@angular/core";
import { Obrazovanje } from "../models/obrazovanje";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Identifiers } from "@angular/compiler";


@Injectable()
export class ObrazovanjeService {
    //private readonly API_URL = 'http://localhost:8083/obrazovanje/';
    private readonly API_URL = 'http://localhost:8080/backend/obrazovanje/';
    dataChange: BehaviorSubject<Obrazovanje[]> = new BehaviorSubject<Obrazovanje[]>([]);
    //privremeno cuvanje podataka iz dijaloga
    private dialogData: any;

    constructor(private httpClient: HttpClient) { }

    public getAllObrazovanje(): Observable<Obrazovanje[]> {
        this.httpClient.get<Obrazovanje[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addObrazovanje(obrazovanje: Obrazovanje): void {
        this.httpClient.post(this.API_URL, obrazovanje).subscribe();
    }

    public updateObrazovanje(obrazovanje: Obrazovanje): void {
        this.httpClient.put(this.API_URL, obrazovanje).subscribe();
    }

    public deleteObrazovanje(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}
