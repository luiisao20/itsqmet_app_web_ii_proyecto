import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user-service';
import { MembershipService } from '../../service/membership-service';
import { UserModel } from '../../models/user';
import { Membership } from '../../models/membership';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPersonCircleOutline } from '@ng-icons/ionicons';
import { PasswordForm } from "../../shared/password-form/password-form";

@Component({
  selector: 'app-profile',
  imports: [FormsModule, NgIconComponent, PasswordForm, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  providers: [provideIcons({ ionPersonCircleOutline })],
})
export class Profile {
  private userService = inject(UserService);
  private membershipService = inject(MembershipService);

  user = signal<UserModel | null>(null);
  membership = signal<Membership | null>(null);
  loading = signal(true);

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  changingPassword = signal(false);

  private uuid = localStorage.getItem('uuid') ?? '';

  ngOnInit() {
    if (this.uuid) {
      this.membershipService.getByUser(this.uuid).subscribe({
        next: (membership) => {
          this.membership.set(membership);
          if (membership.userDTO) {
            this.user.set(membership.userDTO);
          }
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