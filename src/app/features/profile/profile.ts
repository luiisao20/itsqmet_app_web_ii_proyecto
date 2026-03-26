import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { UserModel } from '../../models/user';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPersonCircleOutline } from '@ng-icons/ionicons';
import { PasswordForm } from "../../shared/password-form/password-form";

@Component({
  selector: 'app-profile',
  imports: [FormsModule, NgIconComponent, PasswordForm],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  providers: [provideIcons({ ionPersonCircleOutline })],
})
export class Profile {
  private userService = inject(UserService);

  user = signal<UserModel | null>(null);
  loading = signal(true);

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  changingPassword = signal(false);

  private uuid = localStorage.getItem('uuid') ?? '';

  ngOnInit() {
    if (this.uuid) {
      this.userService.getUserByUuid(this.uuid).subscribe({
        next: (user) => {
          this.user.set(user);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    }
  }

  changePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      alert('Completa todos los campos');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.newPassword.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    this.changingPassword.set(true);

    const updatedUser: UserModel = {
      ...this.user()!,
      password: this.newPassword,
    };

    this.userService.putUser(this.uuid, updatedUser).then(() => {
      alert('Contraseña actualizada exitosamente');
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.changingPassword.set(false);
    }).catch(() => {
      alert('Ha ocurrido un error al cambiar la contraseña');
      this.changingPassword.set(false);
    });
  }
}