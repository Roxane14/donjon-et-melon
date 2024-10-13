import { Component } from '@angular/core';
import { CreatureComponent } from './creature/creature.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { GameStateService, GameStep } from '../game-state.service';
import { messages } from '../constant/log-messages';

@Component({
  standalone:true,
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.scss'],
  imports:[CreatureComponent, ActionButtonsComponent, BattleLogComponent]
})
export class DungeonComponent {
  playerHealth = 70;
  playerXP = 50;
  enemyHealth = 60;
  enemyXP = 40;

  logMessages: string[] = [];

  gameStep: GameStep = "player";

  actions = {
    'playerAttack': {
      enemyHealthImpact: -10,
      playerHealthImpact: 0,
      logMessage: messages.playerAttacked,
      nextGameStep: 'enemy'
    },
    'playerRun': {
      enemyHealthImpact: 0,
      playerHealthImpact: 0,
      logMessage: messages.playerRanAway,
      nextGameStep: 'after'
    },
    'playerUsePotion': {
      enemyHealthImpact: 0,
      playerHealthImpact: 5,
      logMessage: messages.playerUsedPotion,
      nextGameStep: 'enemy'
    },
    'enemyAttack': {
      enemyHealthImpact: 0,
      playerHealthImpact: -10,
      logMessage: messages.enemyAttacked,
      nextGameStep: 'player'
    }
}

  constructor(private gameStateService: GameStateService) {
    gameStateService.getPlayerHealth().subscribe(health => this.playerHealth = health);
    gameStateService.getEnemyHealth().subscribe(health => this.enemyHealth = health);
    gameStateService.getLogMessages().subscribe(messages => this.logMessages = messages);
    gameStateService.getGameStep().subscribe(gameStep => this.gameStep = gameStep);
  }

  performAction(action: string){
    const chosenAction = this.actions[action as keyof typeof this.actions];
    this.gameStateService.updateEnemyHealth(chosenAction.enemyHealthImpact);
    this.gameStateService.updatePlayerHealth(chosenAction.playerHealthImpact);
    this.gameStateService.addLogMessage(chosenAction.logMessage);
    this.gameStateService.updateGameStep(chosenAction.nextGameStep as GameStep);
  }

  checkIfBattleEnded(){
    if(this.enemyHealth === 0){
      this.gameStateService.addLogMessage(messages.playerWon);
      this.gameStateService.updateGameStep('after');
      return true;
    }
    if(this.playerHealth === 0){
      this.gameStateService.addLogMessage(messages.enemyWon);
      this.gameStateService.updateGameStep('after');
      return true;
    }
    if(this.gameStep === 'after'){;
      return true;
    }
    return false;
  }

  handleAction(action: string) {
    if (action === 'Attack') {
      this.performAction('playerAttack')
    } else if (action === 'Run') {
      this.performAction('playerRun')
    } else if (action === 'Use Potion') {
      this.performAction('playerUsePotion');
    }

    if(!this.checkIfBattleEnded()){
      setTimeout(() => {
        this.gameStateService.addLogMessage(messages.enemyGettingReady);
        setTimeout(() => {
          this.enemyAttack();
        }, 1000);
      }, 1000);
    }

  }
  enemyAttack() {
    this.performAction('enemyAttack');
    if(!this.checkIfBattleEnded()){
      this.gameStateService.updateGameStep('player');
    }
  }
}
