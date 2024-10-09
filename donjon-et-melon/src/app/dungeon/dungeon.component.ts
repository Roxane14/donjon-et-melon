import { Component } from '@angular/core';
import { CreatureComponent } from './creature/creature.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

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

  canPlayerPlay: boolean = true;

  handleAction(action: string) {
    if (action === 'Attack') {
      this.enemyHealth -= 10;
      this.logMessages.unshift('You attacked, the enemy lost 10 points.');
      if (this.enemyHealth <= 0) {
        this.logMessages.unshift('You won, end of the battle!');
        this.canPlayerPlay = false;
        return;
      }
    } else if (action === 'Run') {
      this.logMessages.unshift('You ran away. End of the battle, you coward.');
      this.canPlayerPlay = false;
      return;
    } else if (action === 'Use Potion') {
      this.playerHealth += 5;
      this.logMessages.unshift('You used a potion, you gained 5 points.');
    }

    this.canPlayerPlay = false;
    this.logMessages.unshift('The enemy is getting ready to attack...');

    setTimeout(() => {
      this.enemyAttack();
    }, 2000);

  }
  enemyAttack() {
    this.playerHealth -= 10;
    this.logMessages.unshift('The enemy attacked you, you lost 10 points.');
    if (this.playerHealth <= 0) {
      this.logMessages.unshift('The enemy won, end of the battle!');
      this.canPlayerPlay = false;
      return;
    } else {
      this.canPlayerPlay = true;
    }
  }
}
