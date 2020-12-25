import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
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
      width: '50px',
    },
    {
      field: 'firstname',
      label: 'firstname',
      width: '50px',
    },
    {
      field: 'lastname',
      label: 'lastname',
      width: '50px',
    },
    {
      field: 'age',
      label: 'age',
      width: '30px',
    },
    {
      field: 'gender',
      label: 'gender',
      width: '30px',
    },
    {
      field: 'address',
      label: 'address',
      width: '100px',
    },
    {
      field: 'employer',
      label: 'employer',
      width: '50px',
    },
    {
      field: 'email',
      label: 'email',
      width: '100px',
    },
    {
      field: 'city',
      label: 'city',
      width: '50px',
    },
    {
      field: 'state',
      label: 'state',
      width: '50px',
    },
  ];
  isLoading = false;
  keywordChangedLoading = false;
  data: Array<Account> = [];
  page = 1;
  total = 0;
  mode = 'paging';
  pageSize = 20;
  pageSizeOptions = [10, 20, 50, 100];

  showModal = false;

  modalType = 'add';
  rowSelected: object;
  confirmDelete = false;

  keyword = '';
  oldKeyword = '';

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccounts(this.page, this.pageSize);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngDoCheck() {}

  onLoad(event) {}

  openModal(type, rowSelected = {}) {
    this.modalType = type;
    if (type == 'add') {
      this.rowSelected = {};
    } else {
      this.rowSelected = rowSelected;
    }
    this.showModal = true;
  }

  changeViewToEdit() {
    this.modalType = 'edit';
  }

  closeModal() {
    this.showModal = false;
    this.rowSelected = {};
  }

  onPageSizeChange(size) {
    this.getAccounts(1, size);
  }
  onPageChange(event) {
    this.getAccounts(event, this.pageSize);
  }

  getAccounts(pageIndex, pageSize) {
    this.isLoading = true;
    if (this.oldKeyword != this.keyword) {
      this.keywordChangedLoading = true;
    }
    this.accountService
      .getAll({ pageIndex, pageSize, keyword: this.keyword })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (this.mode == 'paging' || this.oldKeyword != this.keyword) {
          this.data = data.data;
        } else {
          this.data = [...this.data, ...data.data];
        }
        this.oldKeyword = this.keyword;
        this.total = data.total;
        this.page = data.pageIndex;
        this.pageSize = data.pageSize;
        this.isLoading = false;
        this.keywordChangedLoading = false;
      });
  }

  addAccount(info) {
    this.accountService
      .addAccount(info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.closeModal();
      });
  }

  updateAccount(id, info) {
    this.accountService
      .updateAccount(id, info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.closeModal();
        this.updateTable(data.data);
      });
  }

  deleteAccount(id) {
    this.accountService
      .deleteAccount(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.closeConfirmDelete();
        this.deletedAccount(id);
      });
  }

  updateTable(data) {
    if (this.mode == 'scroll') {
      this.replaceNewData(data);
    } else {
      this.reloadTable();
    }
  }

  replaceNewData(data) {
    let newData = this.data.map((row) => {
      if (row._id == data._id) {
        return data;
      }
      return row;
    });
    this.data = newData;
  }

  deletedAccount(id) {
    if (this.mode == 'scroll') {
      let newData = this.data.filter((row) => row._id != id);
      this.data = newData;
    } else {
      this.reloadTable();
    }
  }

  onSave(formData) {
    console.log(formData);
    if (formData?._id) {
      this.updateAccount(formData._id, formData);
    } else {
      this.addAccount(formData);
    }
  }

  onAddAccount() {
    this.openModal('add');
  }

  onViewRow(row) {
    this.openModal('view', row);
    console.log(row);
  }

  onRemoveRow(row) {
    console.log(row);
    this.confirmDelete = true;
    this.rowSelected = row;
    // this.deleteAccount(row._id);
  }

  closeConfirmDelete() {
    this.confirmDelete = false;
    this.rowSelected = {};
  }

  onEditRow(row) {
    this.openModal('edit', row);
    console.log(row);
  }

  reloadTable() {
    if (this.mode == 'scroll') {
      this.oldKeyword = '' + Date.now();
      this.getAccounts(1, this.pageSize);
    } else {
      this.getAccounts(this.page, this.pageSize);
    }
  }

  onSearch(e) {
    if (this.mode == 'scroll' && this.keyword == e.value) {
      this.oldKeyword = '' + Date.now();
    }
    this.keyword = e.value;
    this.getAccounts(1, this.pageSize);
  }

  loadMoreWhenScroll() {
    this.getAccounts(this.page + 1, this.pageSize);
  }

  onModeScrollOn(checked) {
    this.mode = checked ? 'scroll' : 'paging';
  }
}
