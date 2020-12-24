import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'v-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  accountForm = new FormGroup({
    _id: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    account_number: new FormControl(),
    balance: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(''),
    address: new FormControl(''),
    employer: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
  });

  @Input() show: boolean;
  @Input() type: string;
  @Input() data: object | any;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  selectedId = null;
  statusOpen = false;

  closeModal() {
    this.onClose.emit();
    this.selectedId = null;
    this.accountForm.reset();
  }

  ngDoCheck() {
    if (this.show == false) {
      this.selectedId = null;
      this.accountForm.reset();
    }
    if (this.statusOpen == false) {
      this.selectedId = this.data?._id;
      if (this.data?._id) {
        this.accountForm.setValue(this.data);
      }
    }
    this.statusOpen = this.show;
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.onSave.emit(this.accountForm.value);
  }

  editModal() {
    this.onEdit.emit();
  }
}
