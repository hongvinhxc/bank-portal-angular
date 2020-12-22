import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'my-datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() columns: Array<Object>;
  @Input() isLoading: boolean;
  @Input() rows: Array<Object>;
  @Input() activePage: number;
  @Input() totalRows: number;
  @Input() pagingMode: string;
  @Input() pageSize: number;
  @Input() pageSizeOptions: Array<number>;

  @Output() onLoad = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
