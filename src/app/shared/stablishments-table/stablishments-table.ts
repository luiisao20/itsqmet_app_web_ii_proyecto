import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { EstablishmentService } from '../../service/establishment-service';
import { lastValueFrom } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import {Establishment} from '../../models/establishment';

@Component({
  selector: 'app-stablishments-table',
  imports: [NgIcon],
  templateUrl: './stablishments-table.html',
  providers: provideIcons({ heroPencilSquare, heroTrash }),
  styleUrl: './stablishments-table.css',
})
export class StablishmentsTable {
  @Output() editItem = new EventEmitter<Establishment>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() selectItem = new EventEmitter<Establishment>();
  @Input() isForm: boolean = false;

  private establishmentService = inject(EstablishmentService);

  query = injectQuery(() => ({
    queryKey: ['admin-establishments'],
    queryFn: () => lastValueFrom(this.establishmentService.getEstablishments()),
  }));

  onSelectToEdit(item: Establishment) {
    this.editItem.emit(item);
  }

  onSelectToDelete(id: number) {
    this.deleteItem.emit(id);
  }

  onSelectItem(item: Establishment) {
    this.selectItem.emit(item);
  }
}
