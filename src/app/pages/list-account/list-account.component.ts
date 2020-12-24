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
  data: Array<object>;
  page = 1;
  total = 0;
  mode = 'paging';
  pageSize = 20;
  pageSizeOptions = [10, 20, 50, 100];

  showModal = false;

  modalType = 'add';
  rowSelected: object;
  confirmDelete = false;

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
    this.rowSelected = {}
  }

  onPageSizeChange(size) {
    this.getAccounts(1, size);
  }
  onPageChange(event) {
    this.getAccounts(event, this.pageSize);
  }

  getAccounts(pageIndex, pageSize) {
    this.isLoading = true;
    this.accountService
      .getAll({ pageIndex, pageSize })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.data = data.data;
        this.total = data.total;
        this.page = data.pageIndex;
        this.pageSize = data.pageSize;
        this.isLoading = false;
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
        this.reloadTable();
      });
  }

  deleteAccount(id) {
    this.accountService
      .deleteAccount(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.closeConfirmDelete();
        this.reloadTable();
      });
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
    console.log(123);

    this.getAccounts(this.page, this.pageSize);
  }
}
