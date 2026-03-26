import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './password-form.html',
  styleUrl: './password-form.css',
})
export class PasswordForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loading = signal<boolean>(false);

  form = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.comparePasswords },
  );

  comparePasswords(control: AbstractControl): ValidationErrors | null {
    const inputPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return inputPassword === confirmPassword ? null : { noMatch: true };
  }

  changePassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const oldPassword = this.form.get('currentPassword')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    console.log(oldPassword);

    this.loading.set(true);
    this.authService.updatePassword(oldPassword!, confirmPassword!).subscribe({
      next: (res) => {
        alert(res.message);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading.set(false);
        this.form.reset();
      },
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.touched) return '';

    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (controlName === 'confirmPassword' && this.form.hasError('noMatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
