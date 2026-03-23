import { Component, inject } from '@angular/core';
import { MembershipService } from '../../service/membership-service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-admin-memberships',
  imports: [NgIconComponent],
  providers: provideIcons({ heroTrash }),
  templateUrl: './admin-memberships.html',
})
export class AdminMemberships {
  private membershipService = inject(MembershipService);
  private queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ['admin-memberships'],
    queryFn: () => lastValueFrom(this.membershipService.getAll()),
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: (id: number) => this.membershipService.delete(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['admin-memberships'] });
      alert('Membresía eliminada exitosamente');
    },
  }));

  deleteMembership(id: number) {
    if (confirm('¿Estás seguro de eliminar esta membresía?')) {
      this.deleteMutation.mutate(id);
    }
  }

  getBadgeClass(cardType: string): string {
    switch (cardType) {
      case 'GOLD': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'SILVER': return 'bg-slate-50 text-slate-600 border-slate-200';
      case 'BRONZE': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }
}
