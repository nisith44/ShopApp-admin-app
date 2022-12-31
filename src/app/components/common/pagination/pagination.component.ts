import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter();
  page=1;

  constructor() { }

  ngOnInit() {}

  pageClick(p){
    this.page=p;
    console.log(this.page);
    this.changePage.emit({page:p})
  }

}
