import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() onAction = new EventEmitter<string>();
  @Input() playerHealth: number = 0;
  @Input() canPlayerPlay: boolean = true;

  performAction(action: string) {
    this.onAction.emit(action);
  }
}
