import { Column } from './modals/column.model';
import { AccountService } from './services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  listColumns: Array<Column> = [
    {
      field: 'account_number',
      label: 'account number',
      width: '50px',
    },
    {
      field: 'balance',
      label: 'balance',
      width: '100px',
    },
    {
      field: 'firstname',
      label: 'firstname',
      width: '100px',
    },
    {
      field: 'lastname',
      label: 'lastname',
      width: '100px',
    },
    {
      field: 'age',
      label: 'age',
      width: '100px',
    },
    {
      field: 'gender',
      label: 'gender',
      width: '100px',
    },
    {
      field: 'address',
      label: 'address',
      width: '100px',
    },
    {
      field: 'employer',
      label: 'employer',
      width: '100px',
    },
    {
      field: 'email',
      label: 'email',
      width: '100px',
    },
    {
      field: 'city',
      label: 'city',
      width: '100px',
    },
    {
      field: 'state',
      label: 'state',
      width: '100px',
    },
  ];
  isLoading = false;
  data: Array<object>;
  page = 1;
  total = 0;
  mode = 'paging';
  pageSize = 10;
  pageSizeOptions = [10, 20, 50, 100];

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getAll({ pageIndex: this.page, pageSize: this.pageSize })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.data = data.data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onLoad(event) {}
}
