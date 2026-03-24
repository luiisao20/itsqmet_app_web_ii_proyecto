import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateTime',
})
export class CustomDateTimePipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
      .format(date)
      .replace('.', '');
  }
}
