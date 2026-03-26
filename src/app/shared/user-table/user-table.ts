import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  viewChild,
} from '@angular/core';
import { UserModel } from '../../models/user';
import { UserService } from '../../service/user-service';
import {
  injectInfiniteQuery,
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
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

  query = injectInfiniteQuery(() => ({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => lastValueFrom(this.userService.getUsers(pageParam, 10)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  }));

  deleteUser(id: string) {
    if (confirm('¿Estás seguro de eliminar el registro?')) {
      this.mutation.mutate(id);
    }
  }

  onSelectUserToEdit(user: UserModel) {
    this.selectUserToEdit.emit(user);
  }

  loadMore() {
    if (this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
      this.query.fetchNextPage();
    }
  }

  anchor = viewChild<ElementRef>('infiniteAnchor');

  constructor() {
    effect(() => {
      const el = this.anchor()?.nativeElement;
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });

      observer.observe(el);
    });
  }
}
