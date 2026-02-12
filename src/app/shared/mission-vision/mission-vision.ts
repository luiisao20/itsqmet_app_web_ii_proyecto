import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEye, ionHeart } from '@ng-icons/ionicons';
import { ButtonDescription } from '../button-description/button-description';

interface InfoButton {
  title: string;
  description: string;
}

@Component({
  selector: 'app-mission-vision',
  imports: [NgIconComponent, ButtonDescription],
  providers: [provideIcons({ ionEye, ionHeart })],
  templateUrl: './mission-vision.html',
  styleUrl: './mission-vision.css',
})
export class MissionVision {
  infoButtons: InfoButton[] = [
    {
      title: 'Nuestra misión',
      description: 'Da clic aquí para observar el compromiso con nuestros clientes',
    },
    {
      title: 'Nuestra visión',
      description: 'Da clic aquí para conocer la visión que tenemos a futuro de nuestro negocio',
    },
  ];
  mission: string =
    'Ofrecer la mejor selección de películas con tecnología de punta en imagen y sonido, además de brindar toda la comodidad, diversión y un servicio personalizado para todos nuestros clientes. Cumpliendo con los estándares de innovación que el mercado requiere, nuestra principal misión es lograr que la experiencia de ir al cine sea mucho más que un cine.';
  vision: string =
    'Convertirnos en el destino preferido de las familias y amantes del séptimo arte, siendo el lugar donde la magia de la tecnología y el servicio personalizado se fusionan para crear momentos de felicidad que trascienden la pantalla.';
  indexInfo: number = 0;

  setIndex(index: number) {
    this.indexInfo = index;
  }
}
