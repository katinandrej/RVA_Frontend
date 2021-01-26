import { Component, OnInit, Inject } from '@angular/core';
import { Sektor } from '../../../models/sektor';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Preduzece } from '../../../models/preduzece';
import { SektorService } from '../../../services/sektor.service';
import { PreduzeceService } from '../../../services/preduzece.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {
  preduzeca: Preduzece[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sektor,
    public sektorService: SektorService,
    public preduzeceService: PreduzeceService
  ) { }

  ngOnInit() {
    this.preduzeceService.getAllPreduzece().subscribe(preduzeca =>
      this.preduzeca = preduzeca);
  }

  public onChange(preduzece) {
    this.data.preduzece = preduzece;
  }

  public add(): void {
    this.data.id = -1;
    this.sektorService.addSektor(this.data);
    this.snackBar.open("Uspešno dodat sektor: " + this.data.id, "U redu",
      {
        duration: 2500
      });
  }

  public update(): void {
    this.sektorService.updateSektor(this.data);
    this.snackBar.open("Uspešno modifikovan sektor: " + this.data.id, "U redu",
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id);
    this.snackBar.open("Uspešno obrisan sektor: " + this.data.id, "U redu",
      {
        duration: 2500
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu",
      {
        duration: 1000
      });
  }

  public compareTo(a, b) {
    return a.id == b.id;
  }

}