import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class JoinedDetailServiceService {
  // users : User[];
  currentUser : User;

  constructor() {
    // this.users = [];
    this.currentUser = null;
  }
  

  public changeCurrentUser(user : User) : void {
    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  public getCurrentUser() : User {
    const user = this.currentUser || JSON.parse(localStorage.getItem("currentUser"));
    return user;
  }



  public addUser(user : User) : void {
    const users = this.getPersistUsers() || [];
    users
      .push(user);
    this.setUsersPersist(users);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  public getUsers() : User[] {
    return this.getPersistUsers();
  }



  public setUsersPersist(users) : void {
    localStorage.setItem("users", JSON.stringify(users));
  }

  public getPersistUsers() : User[] {
    return JSON.parse(localStorage.getItem("users"));
  }



  public clearUserData(): void {
    localStorage.setItem("users", JSON.stringify(null));
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

}
