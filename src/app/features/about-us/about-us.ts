import { Component } from '@angular/core';
import { Button } from '../../shared/button/button';
import { MissionVision } from '../../shared/mission-vision/mission-vision';
import { BenefitsCard } from '../../shared/benefits-card/benefits-card';
import { Timeline } from '../../shared/timeline/timeline';

interface Benefit {
  title: string;
  icon: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about-us',
  imports: [Button, MissionVision, BenefitsCard, Timeline],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  benefits: Benefit[] = [
    {
      title: 'Snacks Gourmet',
      icon: 'ionFastFood',
      description:
        'Disfruta de una amplia variedad de snacks gourmet, desde palomitas de maíz con sabores únicos hasta nachos con queso fundido, pasando por opciones saludables como frutas frescas y ensaladas.',
      image: '/images/benefit-food.jpg',
    },
    {
      title: 'Sección VIP',
      icon: 'ionDiamond',
      description:
        'Experimenta el lujo de nuestra sección VIP, con asientos reclinables de primera clase, servicio personalizado y acceso exclusivo a áreas de descanso y bares privados.',
      image: '/images/benefit-vip.jpg',
    },
    {
      title: 'Tecnología de Punta',
      icon: 'ionTv',
      description:
        'Sumérgete en la mejor experiencia cinematográfica con nuestra tecnología de punta en imagen y sonido, que incluye pantallas de alta definición, sistemas de sonido envolvente y proyección láser.',
      image: '/images/benefit-technology.jpg',
    },
  ];
}
