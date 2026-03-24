import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstablishmentService } from '../../service/establishment-service';
import { Establishment } from '../../models/establishment';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { Button } from '../../shared/button/button';
import { StablishmentsTable } from "../../shared/stablishments-table/stablishments-table";

@Component({
  selector: 'app-admin-establishments',
  imports: [FormsModule, Button, StablishmentsTable],
  templateUrl: './admin-establishments.html',
})
export class AdminEstablishments {
  private establishmentService = inject(EstablishmentService);
  private queryClient = inject(QueryClient);
  private cdr = inject(ChangeDetectorRef);

  name = '';
  city = '';
  description = '';
  editId: number | null = null;
  edit = false;

  mutation = injectMutation(() => ({
    mutationFn: () => {
      const body = {
        name: this.name,
        address: { city: this.city, description: this.description },
      };
      if (this.editId) {
        return this.establishmentService.update(this.editId, body);
      }
      return this.establishmentService.save(body);
    },
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-establishments'] });
      if (this.edit) alert('Establecimiento actualizado exitosamente');
      else alert('Establecimiento creado exitosamente');
      this.resetForm();
      this.cdr.detectChanges();
    },
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: (id: number) => this.establishmentService.delete(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-establishments'] });
      alert('Establecimiento eliminado exitosamente');
    },
  }));

  resetForm() {
    this.name = '';
    this.city = '';
    this.description = '';
    this.editId = null;
    this.edit = false;
  }

  setToEdit(item: Establishment) {
    this.name = item.name;
    this.city = item.address?.city ?? '';
    this.description = item.address?.description ?? '';
    this.editId = item.id;
    this.edit = true;
  }

  deleteEstablishment(id: number) {
    if (confirm('¿Estás seguro de eliminar este establecimiento?')) {
      this.deleteMutation.mutate(id);
    }
  }
}
