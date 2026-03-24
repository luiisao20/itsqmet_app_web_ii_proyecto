import { Component, ElementRef, effect, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { EstablishmentService } from '../../service/establishment-service';
import { Establishment } from '../../models/establishment';
import { FilterService } from '../../service/filter-service';

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
  private filterService = inject(FilterService);

  query = injectQuery(() => ({
    queryKey: ['establishments'],
    queryFn: () => lastValueFrom(this.establishmentService.getEstablishments()),
  }));

  selectedEstablishment = this.filterService.selectedEstablishment;
  isOpen = false;

  constructor() {
    effect(() => {
      const data = this.query.data();
      if (data && data.length > 0 && !this.selectedEstablishment()) {
        this.selectedEstablishment.set(data[0]);
      }
    });
  }

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
