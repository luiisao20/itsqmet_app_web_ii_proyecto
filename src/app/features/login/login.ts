import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string | null = null;
  password: string | null = null;
  showPassword = false;
  rememberMe = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.rememberMe) {
      localStorage.setItem('rememberedEmail', this.email ?? '');
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    this.authService.login(this.email ?? '', this.password ?? '').subscribe({
      next: () => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['']);
      },
      error: () => alert('Usuario o contraseña incorrectos'),
    });
  }
}
