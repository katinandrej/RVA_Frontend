import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {
  MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatPaginatorModule,
  MatGridListModule, MatExpansionModule, MatSortModule, MatTableModule,
  MatToolbarModule, MatSelectModule, MatOptionModule, MatSnackBar, MatDialogModule, MatInputModule, MatSnackBarModule,  
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';

import { PreduzeceService } from './services/preduzece.service';
import { ObrazovanjeService } from './services/obrazovanje.service';
import { PreduzeceDialogComponent } from './components/dialogs/preduzece-dialog/preduzece-dialog.component';
import { ObrazovanjeDialogComponent } from './components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { SektorDialogComponent } from './components/dialogs/sektor-dialog/sektor-dialog.component';
import { RadnikDialogComponent } from './components/dialogs/radnik-dialog/radnik-dialog.component';
import { SektorService } from './services/sektor.service';
import { RadnikService } from './services/radnik.service';


const Routes = [
  { path: 'obrazovanje', component: ObrazovanjeComponent },
  { path: 'sektor', component: SektorComponent },
  { path: 'radnik', component: RadnikComponent },
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ObrazovanjeComponent,
    PreduzeceComponent,
    RadnikComponent,
    SektorComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    PreduzeceDialogComponent,
    ObrazovanjeDialogComponent,
    SektorDialogComponent,
    RadnikDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatGridListModule, MatExpansionModule, MatSortModule, MatTableModule,
    MatToolbarModule, MatSelectModule, MatOptionModule, MatSortModule, MatPaginatorModule,
    MatSnackBarModule, MatDialogModule, MatInputModule, 
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  entryComponents: [PreduzeceDialogComponent, ObrazovanjeDialogComponent, SektorDialogComponent, RadnikDialogComponent],
  providers: [PreduzeceService, ObrazovanjeService, SektorService, RadnikService],
  bootstrap: [AppComponent]
})
export class AppModule { }
