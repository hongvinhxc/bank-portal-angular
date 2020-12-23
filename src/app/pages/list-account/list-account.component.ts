import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Column } from 'src/app/models/column.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css'],
})
export class ListAccountComponent implements OnInit {
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
