import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataTable.nativeElement.DataTable();

  }

}
