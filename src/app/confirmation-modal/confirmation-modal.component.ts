import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  @Input() onConfirm!: Function;

  showModal: boolean = false;
  actionName: string = '';

  openModal(inputText: string) {
    this.actionName = inputText;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmAction() {
    this.onConfirm();
    this.closeModal();
  }
}
