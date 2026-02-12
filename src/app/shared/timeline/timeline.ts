import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroDevicePhoneMobile,
  heroRocketLaunch,
  heroSparkles,
  heroSpeakerWave,
  heroTv,
} from '@ng-icons/heroicons/outline';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-timeline',
  imports: [NgIconComponent],
  templateUrl: './timeline.html',
  providers: [
    provideIcons({
      heroSparkles,
      heroDevicePhoneMobile,
      heroRocketLaunch,
      heroTv,
      heroSpeakerWave,
    }),
  ],
  styleUrl: './timeline.css',
})
export class Timeline {
  timeline: TimelineEvent[] = [
    {
      year: '2020',
      title: 'El Comienzo del Sueño',
      description:
        'Inauguración de nuestra primera sucursal con 4 salas premium, enfocadas en una experiencia íntima y personalizada.',
      icon: 'heroRocketLaunch',
    },
    {
      year: '2021',
      title: 'Revolución Visual 4K',
      description:
        'Adquisición de proyectores láser de última generación en todas las salas, garantizando la resolución 4K más nítida del mercado.',
      icon: 'heroTv',
    },
    {
      year: '2023',
      title: 'Sonido Inmersivo 360°',
      description:
        'Implementación de tecnología Dolby Atmos en nuestras salas VIP, permitiendo que el sonido viaje alrededor del espectador.',
      icon: 'heroSpeakerWave',
    },
    {
      year: '2025',
      title: 'Lanzamiento App & Programa VIP',
      description:
        'Estreno de nuestra plataforma digital con reserva de asientos mediante biometría y beneficios exclusivos para socios.',
      icon: 'heroDevicePhoneMobile',
    },
    {
      year: '2026',
      title: 'Hacia el Futuro: Realidad Mixta',
      description:
        'Inauguración de la primera sala de experiencias sensoriales combinando cine tradicional con elementos de realidad aumentada.',
      icon: 'heroSparkles',
    },
  ];
}
