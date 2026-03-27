import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimePipe',
})
export class CustomTimePipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
      .format(date)
      .replace('.', '');
  }
}
