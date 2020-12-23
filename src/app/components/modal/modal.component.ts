import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'v-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show: Boolean;
  @Output() onClose = new EventEmitter();

  closeModal(event) {
    this.onClose.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
