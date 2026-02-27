import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  newUser: UserModel = {
    name: '',
    email: '',
    password: '',
    role: 'ROLE_USER',
    cellphone: '',
  };

  edit: boolean = false;

  mutation = injectMutation(() => ({
    mutationFn: () =>
      this.newUser.uuid
        ? this.userService.putUser(this.newUser.uuid, this.newUser)
        : this.userService.postUser(this.newUser),

    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['users'] });

      if (this.edit) alert('El registro se ha actualizado exitosamente');
      else alert('El registro se ha creado exitosamente');

      this.resetForm();
      this.cdr.detectChanges();
    },
  }));

  saveUser() {
    if (this.edit && this.newUser.uuid) {
      this.userService.putUser(this.newUser.uuid, this.newUser);
    }
    this.userService.postUser(this.newUser);
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      role: 'ROLE_USER',
      cellphone: '',
    };
  }

  setUserToEdit(user: UserModel) {
    this.newUser = {
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      cellphone: user.cellphone,
      uuid: user.uuid,
    };
    this.edit = true;
  }
}
