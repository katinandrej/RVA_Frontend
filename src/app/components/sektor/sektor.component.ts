import { Component, OnInit, ViewChild } from '@angular/core';
import { Sektor } from '../../models/sektor';
import { Observable } from 'rxjs/Observable';
import { SektorService } from '../../services/sektor.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Preduzece } from '../../models/preduzece';
import { SektorDialogComponent } from '../dialogs/sektor-dialog/sektor-dialog.component';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor>;
  selektovanSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sektorService: SektorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.sektorService.getAllSektori().subscribe(data => {
      this.dataSource = new MatTableDataSource<Sektor>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, naziv: string, oznaka: string, preduzece: Preduzece) {
    const dialogRef = this.dialog.open(SektorDialogComponent, {
      data: { id: id, naziv: naziv, oznaka: oznaka, preduzece: preduzece }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    });
  }

  public selectRow(row){
    this.selektovanSektor = row;
  }
}
