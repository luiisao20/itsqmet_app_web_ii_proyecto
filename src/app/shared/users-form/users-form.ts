import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { FormsModule } from '@angular/forms';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { UserModel } from '../../models/user';
import { UserService } from '../../service/user-service';
import { ionPerson } from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { UserTable } from '../user-table/user-table';

@Component({
  selector: 'app-users-form',
  imports: [FormsModule, Button, NgIconComponent, UserTable],
  templateUrl: './users-form.html',
  styleUrl: './users-form.css',
  providers: [provideIcons({ ionPerson })],
})
export class UsersForm {
  private userService = inject(UserService);
  private queryClient = inject(QueryClient);

  newUser: UserModel = {
    name: '',
    email: '',
    password: 'Pass@123',
    rol: 'CLIENT',
    phone: '',
  };

  edit: boolean = false;

  mutation = injectMutation(() => ({
    mutationFn: () =>
      this.newUser.id
        ? this.userService.putUser(this.newUser.id, this.newUser)
        : this.userService.postUser(this.newUser),

    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['users'] });

      if (this.edit) alert('El registro se ha actualizado exitosamente');
      else alert('El registro se ha creado exitosamente');

      this.resetForm();
    },
  }));

  saveUser() {
    if (this.edit && this.newUser.id) {
      this.userService.putUser(this.newUser.id, this.newUser);
    }
    this.userService.postUser(this.newUser);
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: 'Pass@123',
      rol: 'CLIENT',
      phone: '',
    };
  }

  setUserToEdit(user: UserModel) {
    this.newUser = { ...user };
    this.edit = true;
  }
}
