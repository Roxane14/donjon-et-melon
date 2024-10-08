import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.scss']
})
export class CreatureComponent {
  @Input() name: string = "";
  @Input() health: number = 0;
  @Input() xp: number = 0;
}
