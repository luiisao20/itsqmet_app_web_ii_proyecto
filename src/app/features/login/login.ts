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
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe((success) => {
        if (success) {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['']);
        } else {
          alert('Credenciales incorrectas');
        }
      });
    }
  }
}
