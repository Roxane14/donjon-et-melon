import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() onAction = new EventEmitter<string>();

  performAction(action: string) {
    this.onAction.emit(action);
  }
}
