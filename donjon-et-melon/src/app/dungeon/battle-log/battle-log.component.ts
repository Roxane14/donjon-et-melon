import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss'],
  imports: [NgFor]
})
export class BattleLogComponent {
  @Input() messages: string[] = [];
}
