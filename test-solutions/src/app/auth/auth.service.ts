import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user-model';

@Injectable()
export class AuthService {

  constructor() { }
  // Register
  public register(newUser: User) {
    // http service simulation
    const moskRegistration$ = new Observable(observer => {
      this.addUser(newUser);
      observer.next('Registration was succeed');
      observer.complete()
    })
    return moskRegistration$
  }
  // Save 
  private addUser(newUser: User) {
    const localUsers = localStorage.getItem('users')
    if (localUsers) {
      let users:User[] = JSON.parse(localUsers);
      users.push(newUser);
      console.log(users)
      localStorage.setItem('users', JSON.stringify(users))
    } else {
      localStorage.setItem('users', JSON.stringify([newUser]))
    }
  }
  // Login
  public login(user: User) {
    const moskLogin$ = new Observable(observer => {
      if (this.checkUser(user)) {
        observer.next('Welcome')
      } else {
        observer.error('Wrong credentials')
      }
      observer.complete()
    })
    return moskLogin$
  }
  // Check user
  private checkUser(userInfo: User) {
    const localUsers = localStorage.getItem('users');
    if (!localUsers || localUsers.length == 0) return false
    let users: User[] = JSON.parse(localUsers);
    let index = users.findIndex(user => (user.email == userInfo.email && user.password == userInfo.password));
    if (index !== -1) {
      users[index].isActive = true;
      localStorage.setItem('users', JSON.stringify(users))
      return true
    } else {
    return false
    }
  }
  // Check if there are active user
  public ifLoggedIn(): boolean {
    const localUsers = localStorage.getItem('users');
    if (!localUsers || localUsers.length == 0) return false
    let users: User[] = JSON.parse(localUsers);
    let index = users.findIndex(user => (user.isActive));
    return (index !== -1)
  }
  // Logout
  public logout() {
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      const users = JSON.parse(localUsers)
      const mappedUsers = users.map(user => {
        user.isActive = false;
        return user
      });
      localStorage.setItem('users', JSON.stringify(mappedUsers))
    }
  }
}
