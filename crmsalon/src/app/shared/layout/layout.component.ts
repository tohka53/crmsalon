import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Role, ROLE_LABEL, User } from '../../core/models/models';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  exact?: boolean;
}

const NAV: Record<Role, NavItem[]> = {
  supervisor: [
    { label: 'Panel', link: '/supervisor', icon: '📊', exact: true },
    { label: 'Asignar servicio', link: '/supervisor/asignar', icon: '➕' },
    { label: 'Clientes', link: '/supervisor/clientes', icon: '👥' },
  ],
  estilista: [{ label: 'Mis servicios', link: '/estilista', icon: '💈', exact: true }],
  cliente: [{ label: 'Mis servicios', link: '/cliente', icon: '✨', exact: true }],
};

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: User | null = null;
  items: NavItem[] = [];
  roleLabel = ROLE_LABEL;

  private sub?: Subscription;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // Calculamos una sola vez por cambio de usuario (referencia estable),
    // NO en cada ciclo de detección de cambios, para evitar bucles de CD.
    this.sub = this.auth.user$.subscribe((u) => {
      this.user = u;
      this.items = u ? NAV[u.role] ?? [] : [];
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  trackByLink(_index: number, item: NavItem): string {
    return item.link;
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
