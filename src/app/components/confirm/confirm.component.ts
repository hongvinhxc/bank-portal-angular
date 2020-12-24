import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'v-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input() account: any;
  @Input() show: boolean;
  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  ngDoCheck() {}

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.onClose.emit();
  }

  yesDelete() {
    this.onDelete.emit(this.account._id);
  }
}
