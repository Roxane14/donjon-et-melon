import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { DungeonComponent } from './dungeon/dungeon.component';
import { CharacterComponent } from './character/character.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'donjons', component: DungeonComponent },
  { path: 'mon-perso', component: CharacterComponent },
];
