import { Component, ElementRef, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { EstablishmentService } from '../../service/establishment-service';
import { Establishment } from '../../models/establishment';

@Component({
  selector: 'app-establishment-filter',
  templateUrl: './establishment-filter.html',
  styleUrl: './establishment-filter.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class EstablishmentFilter {
  private elementRef = inject(ElementRef);
  private establishmentService = inject(EstablishmentService);

  query = injectQuery(() => ({
    queryKey: ['establishments'],
    queryFn: () => lastValueFrom(this.establishmentService.getEstablishments()),
  }));

  selectedEstablishment = signal<Establishment | null>(null);
  isOpen = false;

  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    if (this.query.isPending()) return;
    this.isOpen = !this.isOpen;
  }

  selectEstablishment(establishment: Establishment) {
    this.selectedEstablishment.set(establishment);
    this.isOpen = false;
  }
}