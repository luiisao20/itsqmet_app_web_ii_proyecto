import { Component, inject } from '@angular/core';
import { ContactService } from '../../service/contact-service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-contacts',
  imports: [NgIconComponent, DatePipe],
  providers: provideIcons({ heroTrash }),
  templateUrl: './admin-contacts.html',
})
export class AdminContacts {
  private contactService = inject(ContactService);
  private queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ['admin-contacts'],
    queryFn: () => lastValueFrom(this.contactService.getContacts()),
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.contactService.deleteContact(id)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      alert('Contacto eliminado exitosamente');
    },
  }));

  deleteContact(id: string) {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.deleteMutation.mutate(id);
    }
  }
}
