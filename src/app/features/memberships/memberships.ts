import { Component } from '@angular/core';

interface Membership {
  cardType: string;
  topVisits: number;
  minVisits: number;
  foodDiscount: number;
  generalDiscounts: string;
  color: string;
  gradient: string;
  border: string;
  badge: string;
  icon: string;
}

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.html',
  styleUrl: './memberships.css',
})
export class Memberships {
  memberships: Membership[] = [
    {
      cardType: 'BRONZE',
      topVisits: 12,
      minVisits: 0,
      foodDiscount: 0.05,
      generalDiscounts: '2x1 de lunes a viernes en peliculas ya estrenadas',
      color: 'text-amber-700',
      gradient: 'from-amber-900/30 to-amber-700/10',
      border: 'border-amber-700/40',
      badge: 'bg-amber-700/20 text-amber-500',
      icon: '#b45309',
    },
    {
      cardType: 'SILVER',
      topVisits: 24,
      minVisits: 12,
      foodDiscount: 0.10,
      generalDiscounts: '2x1 todos los fines de semana en cualquier pelicula, 10% de descuento en combos de comida',
      color: 'text-slate-300',
      gradient: 'from-slate-500/30 to-slate-400/10',
      border: 'border-slate-400/40',
      badge: 'bg-slate-400/20 text-slate-300',
      icon: '#94a3b8',
    },
    {
      cardType: 'GOLD',
      topVisits: 50,
      minVisits: 24,
      foodDiscount: 0.20,
      generalDiscounts: 'Entrada gratis los martes, 20% de descuento en comida, acceso a estrenos exclusivos y sala VIP',
      color: 'text-yellow-400',
      gradient: 'from-yellow-500/30 to-yellow-400/10',
      border: 'border-yellow-500/40',
      badge: 'bg-yellow-500/20 text-yellow-400',
      icon: '#facc15',
    },
  ];

  formatDiscount(value: number): string {
    return `${value * 100}%`;
  }
}
