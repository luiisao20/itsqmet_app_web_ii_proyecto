import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Button } from '../button/button';
import { CategoryService } from '../../service/category-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionArrowBack, ionArrowForward } from '@ng-icons/ionicons';

interface CategoryButton {
  id: number;
  name: string;
  selectCategory: boolean;
}

@Component({
  selector: 'app-categories',
  imports: [Button, NgIcon],
  providers: provideIcons({ ionArrowBack, ionArrowForward }),
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private categoryService = inject(CategoryService);

  scrollContainer = viewChild<ElementRef>('scrollContainer');

  categories = signal<CategoryButton[]>([]);

  isAllSelected = computed(() => this.categoryService.categorySelected() === null);

  selectAll() {
    this.categories.update((prev) => prev.map((c) => ({ ...c, selectCategory: false })));
    this.categoryService.categorySelected.set(null);
  }

  scrollLeft() {
    this.scrollContainer()?.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer()?.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  selectCategory(item: CategoryButton) {
    this.categories.update((prev) =>
      prev.map((c) => ({ ...c, selectCategory: c.id === item.id ? !c.selectCategory : false })),
    );
    this.categoryService.categorySelected.update((prev) => (item.id === prev?.id ? null : item));
  }

  query = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () =>
      this.categoryService.get().then((res) => {
        const categoriesButton: CategoryButton[] = res.map((category) => ({
          id: category.id,
          name: category.name,
          selectCategory: false,
        }));
        this.categories.set(categoriesButton);
        return categoriesButton;
      }),
  }));
}
