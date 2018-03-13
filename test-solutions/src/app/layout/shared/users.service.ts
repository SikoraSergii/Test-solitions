import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserMosk } from '../../shared/user-mosk-model';
import { Users } from './users-mosk';
import { SearchInfo } from './search-info.model';
import { Columns } from './column-list';
import { Column } from './column.model';

@Injectable()
export class UsersService {
  public tableState: Column[]
  users: UserMosk[]
  searchCounter$: Subject<SearchInfo> 

  constructor() {
    this.users = Users;
    this.tableState = Columns;
    this.searchCounter$ = new Subject<SearchInfo>() 
  }

  // Get all users
  getUsers() {
    const users$ = new Observable<UserMosk[]>(observer => {
      observer.next(this.users);
      observer.complete();
    })
    return users$
  }
  // Get User
  getUser(id: number) {
    const user$ = new Observable<UserMosk>(observer => {
      const index = this.users.findIndex(user => user.id == id);
      if (index !== -1) observer.next(this.users[index])
      else observer.error('User not found')
      observer.complete()
    })
    return user$
  }
  // Toggle user
  toggelUser(user: UserMosk) {
    const index = this.users.findIndex(thisUser => thisUser.id == user.id)
    this.users[index].isActive = !this.users[index].isActive
  }
  // Set search counter
  public setCounter(value: SearchInfo) {
    this.searchCounter$.next(value)
  }
  // Get search counter
  public getCounter(): Observable<SearchInfo> {
    return this.searchCounter$.asObservable();
  }
  // Change table state
  setTable(newState) {
    this.tableState = newState
  }

}
