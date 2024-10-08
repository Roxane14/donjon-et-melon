import { Component } from '@angular/core';
import { CreatureComponent } from './creature/creature.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

@Component({
  standalone:true,
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.scss'],
  imports:[CreatureComponent, ActionButtonsComponent]
})
export class DungeonComponent {
  playerHealth = 70;
  playerXP = 50;
  enemyHealth = 60;
  enemyXP = 40;

  handleAction(action: string) {
    console.log(`Player chose action: ${action}`);
    // Logic for handling each action goes here
    if (action === 'Attack') {
      this.enemyHealth -= 10;
    }
    // Add more actions (Defend, Run, Use Potion) logic as needed
  }
}
