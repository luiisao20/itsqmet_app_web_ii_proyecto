import { Component, inject, signal } from '@angular/core';
import { ContactService } from '../../service/contact-service';
import { ContactInfo } from '../../models/contact';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-contact-admin',
  imports: [NgIconComponent],
  providers: provideIcons({ heroTrash }),
  templateUrl: './contact-admin.html',
  styleUrl: './contact-admin.css',
})
export class ContactAdmin {
  private contactService = inject(ContactService);

  contactList = signal<ContactInfo[]>([]);

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe((data) => this.contactList.set(data));
  }

  deleteContact(id: string) {
    if (confirm('¿Estás seguro de eliminar el registro?'))
      this.contactService.deleteContact(id).subscribe(() => this.getContacts());
  }
}
