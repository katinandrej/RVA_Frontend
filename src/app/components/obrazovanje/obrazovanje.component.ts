import { Component, OnInit, ViewChild } from '@angular/core';
import { ObrazovanjeService } from '../../services/obrazovanje.service';
import { Observable } from 'rxjs/Observable';
import { Obrazovanje } from '../../models/obrazovanje';
import { HttpClient } from '@angular/common/http';
import { ObrazovanjeDialogComponent } from '../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'stepenStrucneSpreme', 'opis','actions'];
  exampleDatabase: ObrazovanjeService;
  dataSource: MatTableDataSource<Obrazovanje>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public obrazovanjeService: ObrazovanjeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ObrazovanjeService(this.httpClient);
    this.obrazovanjeService.getAllObrazovanje().subscribe(data => {
      this.dataSource = new MatTableDataSource<Obrazovanje>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, naziv: string, stepenStrucneSpreme: string, opis: string) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, {
      data: { id: id, naziv: naziv, stepenStrucneSpreme:stepenStrucneSpreme, opis: opis }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
