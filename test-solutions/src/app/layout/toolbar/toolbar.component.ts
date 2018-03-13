import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../shared/users.service';
import { SearchInfo } from '../shared/search-info.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  searchInfo: SearchInfo;
  subscribtion: Subscription

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchInfo = new SearchInfo()
    this.subscribtion = this.usersService.getCounter().subscribe(info => {
      this.searchInfo = info
    })
      
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login')
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe()
  }
}
