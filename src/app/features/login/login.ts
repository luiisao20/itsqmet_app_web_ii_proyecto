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

  private authService = inject(AuthService);

  private router = inject(Router);

  onLogin() {
    this.authService.login(this.email ?? '', this.password ?? '').subscribe({
      //Se activa si la respuesta de la api fue 200 OK.
      next: () => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['']);
      },
      //Se activa si la api rechazó la petición 403, 404, 500.
      error: () => alert('Usuario o contraseña incorrectos'),
    });
  }
}
