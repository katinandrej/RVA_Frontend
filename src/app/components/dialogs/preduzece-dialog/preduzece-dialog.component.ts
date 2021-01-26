import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreduzeceService } from '../../../services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public preduzeceService: PreduzeceService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.id = -1;
    this.preduzeceService.addPreduzece(this.data);
    this.snackBar.open("Uspešno dodato preduzece: " + this.data.naziv, "U redu",
      {
        duration: 2500
      });
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data);
    this.snackBar.open("Uspešno modifikovano preduzece: " + this.data.id, "U redu",
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id);
    this.snackBar.open("Uspešno obrisano preduzece: " + this.data.id, "U redu",
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
}
