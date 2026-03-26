import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Movie } from '../../models/movie';
import { Establishment } from '../../models/establishment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../button/button';
import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../service/schedule-service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './schedule-form.html',
  styleUrl: './schedule-form.css',
})
export class ScheduleForm {
  @Input() movie?: Movie;
  @Input() stablishment?: Establishment;
  @Output() returnStablishment = new EventEmitter();

  private fb = inject(FormBuilder);
  private scheduleService = inject(ScheduleService);
  private queryClient = inject(QueryClient);
  private router = inject(Router);

  loading = signal<boolean>(false);

  form = this.fb.group({
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    available: [60, [Validators.required]],
    type: ['', [Validators.required]],
    room: [1, [Validators.required]],
  });

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.touched || !control?.invalid) return '';

    if (control.hasError('required')) return 'Este campo es obligatorio';
    return '';
  }

  mutation = injectMutation(() => ({
    mutationFn: (item: Schedule) => lastValueFrom(this.scheduleService.saveSchedule(item)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
      alert('Registro guardado exitosamente');
      this.router.navigate(['/panel/schedules/list']);
    },
    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error}`);
    },
    onSettled: () => {
      this.loading.set(false);
    },
  }));

  registerSchedule() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const datetd = this.form.get('date')?.value;
    const date = new Date(`${this.form.get('date')?.value}T${this.form.get('time')?.value}`);
    const newSchedule: Schedule = {
      movie: this.movie!,
      stablishment: this.stablishment!,
      date: date.toISOString(),
      availableSeats: this.form.get('available')?.value!,
      occupiedList: [],
      occupiedSeats: 0,
      room: this.form.get('room')?.value!,
      type: this.form.get('type')?.value!,
    };
    this.scheduleService
      .getTimeAvaiable({
        movieId: this.movie?.id!,
        stablishmentId: this.stablishment?.id!,
        date: datetd!,
      })
      .then((res) => console.log(res))
      .catch((error) => alert(error));
  }

  onPrev() {
    this.form.reset();
    this.returnStablishment.emit();
  }
}
