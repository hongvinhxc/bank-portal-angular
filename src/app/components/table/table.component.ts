import { Column } from '../../models/column.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'my-datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() columns: Array<Column>;
  @Input() isLoading: boolean;
  @Input() rows: Array<Object>;
  @Input() activePage: number;
  @Input() totalRows: number;
  @Input() pagingMode: string;
  @Input() pageSize: number;
  @Input() pageSizeOptions: Array<number>;

  @Output() onLoad = new EventEmitter();
  @Output() onViewRow = new EventEmitter();
  @Output() onEditRow = new EventEmitter();
  @Output() onRemoveRow = new EventEmitter();
  @Output() onReload = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  viewRow(event) {
    this.onViewRow.emit(event);
  }

  editRow(event) {
    this.onEditRow.emit(event);
  }

  removeRow(event) {
    this.onRemoveRow.emit(event);
  }

  reloadTable() {
    this.onReload.emit();
  }
}
