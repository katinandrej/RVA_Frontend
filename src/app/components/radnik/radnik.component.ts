import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RadnikService } from '../../services/radnik.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Radnik } from '../../models/radnik';
import { Observable } from 'rxjs/Observable';
import { Preduzece } from '../../models/preduzece';
import { Sektor } from '../../models/sektor';
import { Obrazovanje } from '../../models/obrazovanje';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {
  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];
  dataSource: MatTableDataSource<Radnik>;

  @Input() selektovanSektor: Sektor;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public radnikService: RadnikService, public dialog: MatDialog) { }

  ngOnInit() {
    //this.dataSource = this.stavkaPorudzbineService.getStavkePorudzbine();
    //this.dataSource = this.radnikService.getRadniciZaSektor(this.selektovanSektor.id);
  }

  ngOnChanges() {
    if (this.selektovanSektor.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.radnikService.getRadniciZaSektor(this.selektovanSektor.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<Radnik>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojLk: number,
    sektor: Sektor, obrazovanje: Obrazovanje) {
     const dialogRef = this.dialog.open(RadnikDialogComponent, {
       data: {
         i: id, id: id, ime: ime, prezime: prezime, brojLk: brojLk,
         sektor: sektor, obrazovanje: obrazovanje
       }
     });
     dialogRef.componentInstance.flag = flag;
     if (flag == 1)
     dialogRef.componentInstance.data.sektor = this.selektovanSektor;
     dialogRef.afterClosed().subscribe(result => {
       if (result == 1)
         this.loadData();
     });
  }
}
