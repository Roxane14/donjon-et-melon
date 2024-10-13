import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GameStateService, GameStep } from '../../game-state.service';

@Component({
  standalone: true,
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() onAction = new EventEmitter<string>();

  playerHealth = 0;
  gameStep: GameStep = 'before';

  constructor(private gameStateService: GameStateService){
    this.gameStateService.getPlayerHealth().subscribe(playerHealth => this.playerHealth = playerHealth);
    this.gameStateService.getGameStep().subscribe(gameStep => this.gameStep = gameStep);
  }

  performAction(action: string) {
    this.onAction.emit(action);
  }
}
