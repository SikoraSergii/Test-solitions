import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/users.service';
import { Columns } from '../../shared/column-list';
import { Colors } from '../../shared/color-list';
import { Column } from '../../shared/column.model';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  columns: Column[];
  colors: string[]

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.columns = this.usersService.tableState;
    this.colors = Colors;
  }
  // Select color
  onSelect(color: string, index: number) {
    this.columns[index].color = color;
    this.usersService.setTable(this.columns)
  }
  // Visible
  onCheckboxClick(index: number) {
    this.columns[index].visible = !this.columns[index].visible
    this.usersService.setTable(this.columns)
  }
}
