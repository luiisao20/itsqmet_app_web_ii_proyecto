import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo } from '../../models/contact';
import { ContactService } from '../../service/contact-service';

@Component({
  selector: 'app-contact-form',
  imports: [Button, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  formContact = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    message: ['', [Validators.required, Validators.maxLength(255)]],
  });

  showErrors(field: string, errorType: string): boolean {
    const input = this.formContact.get(field);

    if (input && input.invalid && input.touched) {
      return input.hasError(errorType);
    }

    return false;
  }

  submit() {
    if (this.formContact.invalid) {
      this.formContact.markAllAsTouched();
      return;
    }

    const contact: ContactInfo = {
      name: this.formContact.get('name')?.value!,
      email: this.formContact.get('email')?.value!,
      message: this.formContact.get('message')?.value!,
    };

    this.contactService.postContact(contact).subscribe(() => {
      this.formContact.reset();
      alert('Informacion enviada con exito');
    });
  }
}
