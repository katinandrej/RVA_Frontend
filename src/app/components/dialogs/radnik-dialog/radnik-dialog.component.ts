import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Obrazovanje } from '../../../models/obrazovanje';
import { Radnik } from '../../../models/radnik';
import { ObrazovanjeService } from '../../../services/obrazovanje.service';
import { RadnikService } from '../../../services/radnik.service';

@Component({
 selector: 'app-radnik-dialog',
 templateUrl: './radnik-dialog.component.html',
 styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {
 obrazovanja: Obrazovanje[];
 public flag: Number;
 constructor(public snackBar: MatSnackBar,
   public dialogRef: MatDialogRef<RadnikDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Radnik,
   public radnikService: RadnikService,
   public obrazovanjeService: ObrazovanjeService
 ) { }


 ngOnInit() {
   this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
     this.obrazovanja = obrazovanja
   );
 }

 public add(): void {
   this.data.id = -1;
   this.radnikService.addRadnik(this.data);
   this.snackBar.open("Uspešno dodat radnik", "U redu", { duration: 2500 });
 }

 public update(): void {
   this.radnikService.updateRadnik(this.data);
   this.snackBar.open("Uspešno modifikovan radnik", "U redu", { duration: 2500 });
 }

 public delete(): void {
   this.radnikService.deleteRadnik(this.data.id);
   this.snackBar.open("Uspešno obrisan radnik", "U redu", { duration: 2000 });
 }

 public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open("Odustali ste", "U redu", { duration: 1000 });
 }

 compareTo(a, b) {
   return a.id == b.id;
 }
}
