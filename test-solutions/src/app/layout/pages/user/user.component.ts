import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../shared/users.service';
import { UserMosk } from '../../../shared/user-mosk-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserMosk
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id
    this.usersService.getUser(id)
      .subscribe(
      user => this.user = user,
      error => console.log(error)
      )
  }

}
