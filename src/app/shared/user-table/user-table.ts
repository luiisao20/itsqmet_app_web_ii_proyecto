import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserModel } from '../../models/user';
import { UserService } from '../../service/user-service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [NgIconComponent, CommonModule],
  providers: provideIcons({ heroPencilSquare, heroTrash }),
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  @Output() selectUserToEdit = new EventEmitter<UserModel>();

  private userService = inject(UserService);
  private queryClient = inject(QueryClient);

  private mutation = injectMutation(() => ({
    mutationFn: (id: string) => this.userService.deleteUser(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('El registro se ha eliminado exitosamente');
    },
  }));

  query = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => lastValueFrom(this.userService.getUsers()),
  }));

  deleteUser(id: string) {
    if (confirm('¿Estás seguro de eliminar el registro?')) {
      this.mutation.mutate(id);
    }
  }

  onSelectUserToEdit(user: UserModel) {
    this.selectUserToEdit.emit(user);
  }
}
