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
  @Input() keywordChangedLoading: boolean;
  @Input() rows: Array<Object>;
  @Input() activePage: number;
  @Input() totalRows: number;
  @Input() pagingMode: string;
  @Input() pageSize: number;

  @Output() onLoadMore = new EventEmitter();
  @Output() onViewRow = new EventEmitter();
  @Output() onEditRow = new EventEmitter();
  @Output() onRemoveRow = new EventEmitter();
  @Output() onReload = new EventEmitter();

  withinInterval: boolean;

  maxPage: number = 1;

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

  loadMore(e) {
    if (this.withinInterval) return;
    this.withinInterval = true;
    setTimeout(() => {
      this.onLoadMore.emit();
      this.withinInterval = false;
    }, 1000);
  }

  onScroll(e) {
    if (this.pagingMode == 'paging') return;
    this.maxPage = Math.ceil(this.totalRows / this.pageSize);
    if (this.activePage == this.maxPage) return;
    let bottomWrap = e.target.getBoundingClientRect().bottom;
    let bottomTable = e.target.querySelector('table').getBoundingClientRect()
      .bottom;
    // this.loadMore(e);
    if (bottomTable - bottomWrap < 200) {
      this.loadMore(e);
    }
  }
}
