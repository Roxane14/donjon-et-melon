import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type GameStep = "before" | "player" | "enemy" | "after";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  // Player and enemy states as observables to allow reactivity
  private playerHealth = new BehaviorSubject<number>(70);
  private playerXP = new BehaviorSubject<number>(50);
  private enemyHealth = new BehaviorSubject<number>(60);
  private enemyXP = new BehaviorSubject<number>(40);

  private logMessages = new BehaviorSubject<string[]>([]);

  private gameStep = new BehaviorSubject<GameStep>("player");

  // Getters for observables
  getPlayerHealth() {
    return this.playerHealth.asObservable();
  }

  getPlayerXP() {
    return this.playerXP.asObservable();
  }

  getEnemyHealth() {
    return this.enemyHealth.asObservable();
  }

  getEnemyXP() {
    return this.enemyXP.asObservable();
  }

  getLogMessages() {
    return this.logMessages.asObservable();
  }

  getGameStep(){
    return this.gameStep.asObservable();
  }

  updatePlayerHealth(amount: number) {
    const newHealth = this.playerHealth.value + amount;
    this.playerHealth.next(newHealth);
  }

  updateEnemyHealth(amount: number) {
    const newHealth = this.enemyHealth.value + amount;
    this.enemyHealth.next(newHealth);
  }

  addLogMessage(message: string) {
    const newLogs = [message, ...this.logMessages.value];
    this.logMessages.next(newLogs);
  }

  updateGameStep(step: GameStep){
    this.gameStep.next(step);
  }

}
