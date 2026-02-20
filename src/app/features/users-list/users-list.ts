import { Component } from '@angular/core';
import { UsersForm } from '../../shared/users-form/users-form';

@Component({
  selector: 'app-users-list',
  imports: [UsersForm],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {}
