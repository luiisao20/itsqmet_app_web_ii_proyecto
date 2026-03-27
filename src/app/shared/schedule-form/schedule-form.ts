import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Movie } from '../../models/movie';
import { Establishment } from '../../models/establishment';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Button } from '../button/button';
import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../service/schedule-service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CustomTimePipe } from '../../pipes/custom-time-pipe';

@Component({
  selector: 'app-schedule-form',
  imports: [ReactiveFormsModule, Button, CustomTimePipe],
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
  showComplete = signal<boolean>(false);
  timeAvailable = signal<string | null>(null);

  form = this.fb.group(
    {
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      available: [60, [Validators.required]],
      type: ['', [Validators.required]],
      room: [1, [Validators.required]],
    },
    { validators: this.compareDates.bind(this) },
  );

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.touched) return '';

    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (controlName === 'time' && this.form.hasError('timeUnavailable')) {
      return 'Esta hora no se encuentra disponible';
    }
    return '';
  }

  compareDates(control: AbstractControl): ValidationErrors | null {
    const date = control.get('date')?.value;
    const time = control.get('time')?.value;

    if (!date || !time || !this.timeAvailable()) return null;
    const selectedTime = new Date(`${date}T${time}`);
    const forbiddenTime = new Date(`${this.timeAvailable()}`);
    return selectedTime.getTime() < forbiddenTime.getTime() ? { timeUnavailable: true } : null;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) this.getTimeAvailable();
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

  getTimeAvailable() {
    const datetd = this.form.get('date')?.value;
    this.scheduleService
      .getTimeAvaiable({
        movieId: this.movie?.id!,
        stablishmentId: this.stablishment?.id!,
        date: datetd!,
      })
      .then((res) => {
        console.log(res);
        
        this.timeAvailable.set(res[0]);
        this.showComplete.set(true);
      })
      .catch((error) => alert(error));
  }

  registerSchedule() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
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
    this.mutation.mutate(newSchedule);
  }

  onPrev() {
    this.form.reset();
    this.returnStablishment.emit();
  }
}
