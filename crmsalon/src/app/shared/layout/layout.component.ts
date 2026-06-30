import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Role, ROLE_LABEL, User } from '../../core/models/models';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  user$: Observable<User | null>;
  roleLabel = ROLE_LABEL;

  constructor(public auth: AuthService) {
    this.user$ = auth.user$;
  }

  navItems(role: Role): NavItem[] {
    switch (role) {
      case 'supervisor':
        return [
          { label: 'Panel', link: '/supervisor', icon: '📊', exact: true },
          { label: 'Asignar servicio', link: '/supervisor/asignar', icon: '➕' },
          { label: 'Clientes', link: '/supervisor/clientes', icon: '👥' },
        ];
      case 'estilista':
        return [{ label: 'Mis servicios', link: '/estilista', icon: '💈', exact: true }];
      case 'cliente':
        return [{ label: 'Mis servicios', link: '/cliente', icon: '✨', exact: true }];
      default:
        return [];
    }
  }

  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  logout(): void {
    this.auth.logout();
  }
}
