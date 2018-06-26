import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AIBot } from '../models/aibot';

@Injectable()
export class JoinedDetailServiceService {
  // users : User[];
  // currentUser : User;
  currentUser: Observable<User>;
  aiBot: Observable<AIBot>

  private currentUserSubject: BehaviorSubject<User>;

  constructor() {
    // this.users = [];
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')) || null);
  }

  public changeCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  public addUser(user: User): void {
    const users = this.getPersistUsers() || [];
    users.push(user);
    this.setUsersPersist(users);
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public addAIBot(aiBot: AIBot): void {
    const aiBots = this.getPersistAIBots() || [];
    aiBots.push(aiBot);
    this.setAIBotPersist(aiBots);
    // this.currentUserSubject.next(aiBot);
    // localStorage.setItem('', JSON.stringify(user));
  }

  public getUsers(): User[] {
    return this.getPersistUsers();
  }

  public getAIBots(): AIBot[] {
    return this.getPersistAIBots();
  }

  public setUsersPersist(users): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public setAIBotPersist(aiBots): void {
    localStorage.setItem('aiBots', JSON.stringify(aiBots));
  }

  public getPersistUsers(): User[] {
    return JSON.parse(localStorage.getItem('users'));
  }

  public getPersistAIBots(): AIBot[] {
    return JSON.parse(localStorage.getItem('aiBots'));
    // const aibots = JSON.parse(localStorage.getItem('aiBots'));
    // if (aibots) {
    //   if (aibots.isLoggedIn) {
    //     return aibots;
    //   }
    //   return null;
    // } else {
    //   return null;
    // }
  }

  public clearUserData(): void {
    localStorage.setItem('users', JSON.stringify(null));
    localStorage.setItem('currentUser', JSON.stringify(null));
    localStorage.setItem('userData', JSON.stringify({ isLoggedIn: false }));
    localStorage.setItem('aiBots', JSON.stringify(null));
  }
}
