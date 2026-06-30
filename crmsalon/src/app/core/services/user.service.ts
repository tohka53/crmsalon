import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Role, User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private storage: StorageService) {}

  all(): User[] {
    return this.storage.get<User[]>('users', []);
  }

  byId(id: string): User | undefined {
    return this.all().find((u) => u.id === id);
  }

  byRole(role: Role): User[] {
    return this.all().filter((u) => u.role === role);
  }

  clientes(): User[] {
    return this.byRole('cliente');
  }

  estilistas(): User[] {
    return this.byRole('estilista');
  }

  byEmail(email: string): User | undefined {
    return this.all().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  /** Crea un nuevo cliente (usado por el supervisor). */
  addCliente(nombre: string, email: string, telefono?: string): User {
    const list = this.all();
    const colors = ['#059669', '#d97706', '#dc2626', '#0891b2', '#7c3aed', '#db2777'];
    const user: User = {
      id: 'u' + Date.now().toString(36),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password: '123456',
      role: 'cliente',
      telefono,
      color: colors[list.length % colors.length],
    };
    this.storage.set('users', [...list, user]);
    return user;
  }
}
