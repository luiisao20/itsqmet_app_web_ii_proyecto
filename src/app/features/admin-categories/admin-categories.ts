import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category-service';
import { Category } from '../../models/movie';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-admin-categories',
  imports: [FormsModule, NgIconComponent, Button],
  providers: provideIcons({ heroPencilSquare, heroTrash }),
  templateUrl: './admin-categories.html',
})
export class AdminCategories {
  private categoryService = inject(CategoryService);
  private queryClient = inject(QueryClient);
  private cdr = inject(ChangeDetectorRef);

  categoryName = '';
  editId: number | null = null;
  edit = false;

  query = injectQuery(() => ({
    queryKey: ['admin-categories'],
    queryFn: () => this.categoryService.get(),
  }));

  mutation = injectMutation(() => ({
    mutationFn: () => {
      if (this.editId) {
        return this.categoryService.update(this.editId, { name: this.categoryName });
      }
      return this.categoryService.save({ name: this.categoryName });
    },
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      if (this.edit) alert('Categoría actualizada exitosamente');
      else alert('Categoría creada exitosamente');
      this.resetForm();
      this.cdr.detectChanges();
    },
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: (id: number) => this.categoryService.delete(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      alert('Categoría eliminada exitosamente');
    },
  }));

  resetForm() {
    this.categoryName = '';
    this.editId = null;
    this.edit = false;
  }

  setToEdit(category: Category) {
    this.categoryName = category.name ?? '';
    this.editId = category.id;
    this.edit = true;
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.deleteMutation.mutate(id);
    }
  }
}
