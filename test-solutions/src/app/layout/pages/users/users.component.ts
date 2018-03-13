import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { UsersService } from '../../shared/users.service';
import { UserMosk } from '../../../shared/user-mosk-model';
import { SearchInfo } from '../../shared/search-info.model';
import { SortState } from '../../shared/sort-state.model ';
import { Column } from '../../shared/column.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserMosk[];
  allUsers: UserMosk[];
  inputControl: FormGroup;
  onlyActive: boolean;
  sortState: SortState;
  tableState: Column[];

  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.onlyActive = data.onlyActive
      this.getUsers(data.onlyActive);
      this.setStates()
    })
    this.setFilterInput();
    this.tableState = this.usersService.tableState
  }
  /*
  * Init
 */
  // Set filter
  setFilterInput() {
    this.inputControl = new FormGroup({
      filter: new FormControl('')
    });
    this.inputControl.valueChanges
      .subscribe(val => {
        this.setStates();
        this.users = this.filterUsers()
      })
  }
  //Filter users
  filterUsers(): UserMosk[] {
    const text = this.inputControl.get('filter').value
    if (!text) {
      this.usersService.setCounter(new SearchInfo())
      return this.allUsers.slice()
    } else {
      const filtered = this.allUsers.filter(this.filter(text));
      this.usersService.setCounter(new SearchInfo(true, filtered.length))
      return filtered
    }
  }
  // Users
  getUsers(onlyActive: boolean) {
    this.usersService.getUsers()
      .subscribe(res => {
        this.allUsers = onlyActive ? res.filter(user => user.isActive) : res;
        this.users = this.allUsers.slice();
      })
  }
  // Set states
  setStates() {
    this.sortState = new SortState()
  }
  /*
  * Sorting
 */
  // Header click handler
  onHeaderClick(column: number) {
    if (this.onlyActive && (column == 3 || column == 4)) return
    if (this.sortState.column == column) {
      this.sortState.state = this.sortState.state == 2 ? 0 : ++this.sortState.state
    } else {
      this.sortState.column = column;
      this.sortState.state = 1;
    }
    // catch no sorting state
    if (this.sortState.state == 0) {
      this.users.sort((a, b) => a.id > b.id ? 1 : -1)
      this.cd.markForCheck();
      return
    }
    const direction = this.sortState.state == 1 ? 1 : -1
    // string sorting - name and surname
    if (this.sortState.column == 1 || this.sortState.column == 2) {
      const property = this.sortState.column == 1 ? 'name' : 'surname'
      this.users.sort(this.stringCompare(direction, property))
    }
    // age
    else if (this.sortState.column == 3) {
      this.users.sort(this.numberCompare(direction))
    }
    // active
    else if (this.sortState.column == 4) {
      this.users.sort(this.booleanCompare(direction))
    }
  }

  //Compare functions
  stringCompare(direction: number, property: string) {
    return (a: UserMosk, b: UserMosk) => {
      const aProperty = a[property].toLowerCase();
      const bProperty = b[property].toLowerCase();
      if (aProperty > bProperty) return direction
      else if (aProperty < bProperty) return direction * -1
      else return 0
    }
  }
  numberCompare(direction: number) {
    return (a: UserMosk, b: UserMosk) => {
      const aProperty = +a.age;
      const bProperty = +b.age;
      if (aProperty > bProperty) return direction
      else if (aProperty < bProperty) return direction * -1
      else return 0
    }
  }
  booleanCompare(direction: number) {
    return (a: UserMosk, b: UserMosk) => {
      const aProperty = a.isActive;
      const bProperty = b.isActive;
      if (aProperty > bProperty) return direction
      else if (aProperty < bProperty) return direction * -1
      else return 0
    }
  }
  // Filter
  filter(value: string) {
    return (user: UserMosk) => {
      let isGood: boolean
      if (this.onlyActive) {
        isGood = (user.name.toLowerCase().includes(value) || user.surname.toLowerCase().includes(value));
      }
      else {
        isGood = (user.age.includes(value)
          || user.name.toLowerCase().includes(value)
          || user.surname.toLowerCase().includes(value)
          || user.isActive.toString().includes(value)
        );
      }
      return isGood
    }
  }
  /*
  * Users click handler
 */
  // User click
  onUserClick(user: UserMosk) {
    this.router.navigate(['user', user.id])
  }
  // Checkbox
  onCheckboxClick(user: UserMosk) {
    this.usersService.toggelUser(user);
    this.findAndToggle(user, this.allUsers);
    this.findAndToggle(user, this.users);

  }
  // Prevent
  onCheckboxColumnClick(event: any) {
    event.stopPropagation();
  }
  // Find user and set active
  private findAndToggle(user: UserMosk, users: UserMosk[]) {
    const index = users.findIndex(thisUser => thisUser.id == user.id)
    users[index].isActive = !users[index].isActive
  }
}
