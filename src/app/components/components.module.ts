import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { PaginationComponent } from './common/pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';

const components=[
   ProductsComponent,DashboardComponent,PaginationComponent
]


@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [ IonicModule,ReactiveFormsModule,FormsModule,CommonModule,BrowserModule ,],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []

})

export class ComponentsModule { }