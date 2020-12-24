import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'v-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() sizeOption: Array<number>;
  @Input() size: number;
  @Input() total: number;
  @Input() page: number;
  @Input() pagingMode: string;
  @Output() onPageSizeChange = new EventEmitter();
  @Output() onPageChange = new EventEmitter();
  @Output() onModeScrollOn = new EventEmitter();

  maxPage: number;
  pageSelect: Array<number>;

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck() {
    this.maxPage = Math.ceil(this.total / this.size);
    this.pageSelect = [];
    if (this.maxPage < 1) {
      this.pageSelect = [1];
    } else if (this.page < 3) {
      this.pageSelect.push(...[1, 2]);
      for (let i = 3; i < 6; i++) {
        if (i < this.maxPage) this.pageSelect.push(i);
      }
    } else if (this.page > this.maxPage - 2) {
      for (let i = this.maxPage; i > this.maxPage - 5; i--) {
        this.pageSelect.unshift(i);
      }
    } else {
      for (let i = this.page - 2; i < this.page + 3; i++) {
        this.pageSelect.push(i);
      }
    }
  }

  pageSizeChange(event) {
    this.onPageSizeChange.emit(event.target.value);
  }

  pageChange(p) {
    if (p < 1) p = 1;
    if (p > this.maxPage) p = this.maxPage;
    if (p == this.page) return;
    this.onPageChange.emit(p);
  }

  turnScrollModeOn(e) {
    this.onModeScrollOn.emit(e.target.checked);
  }
}
