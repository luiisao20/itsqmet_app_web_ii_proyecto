import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user-service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  private userService = inject(UserService);
  private router = inject(Router);

  private fb = inject(FormBuilder);

  regexEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  regexPassword = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  regexPhone = '^[0-9]+$';

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      cellphone: ['', [Validators.pattern(this.regexPhone)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPassword)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.validatePassword,
    },
  );

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const inputPassword = control.get(`password`)?.value;
    const inputConfirmPassword = control.get(`confirmPassword`)?.value;

    return inputPassword === inputConfirmPassword
      ? null
      : {
          validate: true,
        };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user: UserModel = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        role: 'ROLE_USER',
        cellphone: this.registerForm.value.cellphone || '',
      };

      this.userService.postUser(user).then(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}
