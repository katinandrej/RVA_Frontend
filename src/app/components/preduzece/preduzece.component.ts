import { Component, OnInit, ViewChild } from '@angular/core';
import { PreduzeceService } from '../../services/preduzece.service';
import { Observable } from 'rxjs/Observable';
import { Preduzece } from '../../models/preduzece';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'pib', 'sediste', 'opis', 'actions'];
  exampleDatabase: PreduzeceService;
  dataSource: MatTableDataSource<Preduzece>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public preduzeceService: PreduzeceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new PreduzeceService(this.httpClient);
    this.preduzeceService.getAllPreduzece().subscribe(data => {
      this.dataSource = new MatTableDataSource<Preduzece>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, naziv: string, pib: number, sediste: string, opis: string) {
    const dialogRef = this.dialog.open(PreduzeceDialogComponent, {
      data: { id: id, naziv: naziv, pib: pib, sediste:sediste, opis:opis }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
