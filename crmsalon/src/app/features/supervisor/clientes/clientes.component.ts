import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitaVista, CitaVistaService } from '../../../core/services/cita-vista.service';
import { UserService } from '../../../core/services/user.service';
import { ESTADO_BADGE, ESTADO_LABEL, User } from '../../../core/models/models';

@Component({
  selector: 'app-supervisor-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
})
export class SupervisorClientesComponent implements OnInit, OnDestroy {
  clientes: User[] = [];
  busqueda = '';
  seleccionadoId = '';
  private todas: CitaVista[] = [];

  estadoLabel = ESTADO_LABEL;
  estadoBadge = ESTADO_BADGE;

  private sub?: Subscription;

  constructor(private users: UserService, private vista: CitaVistaService) {}

  ngOnInit(): void {
    this.clientes = this.users.clientes();
    if (this.clientes.length) this.seleccionadoId = this.clientes[0].id;
    this.sub = this.vista.todas$().subscribe((list) => (this.todas = list));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get clientesFiltrados(): User[] {
    const q = this.busqueda.trim().toLowerCase();
    return q
      ? this.clientes.filter(
          (c) => c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
        )
      : this.clientes;
  }

  get seleccionado(): User | undefined {
    return this.clientes.find((c) => c.id === this.seleccionadoId);
  }

  private get citasCliente(): CitaVista[] {
    return this.todas
      .filter((c) => c.clienteId === this.seleccionadoId)
      .sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion));
  }

  get actual(): CitaVista | undefined {
    return this.citasCliente.find(
      (c) => c.estado === 'pendiente' || c.estado === 'en_progreso',
    );
  }

  get historial(): CitaVista[] {
    return this.citasCliente.filter(
      (c) => c.estado === 'completado' || c.estado === 'cancelado',
    );
  }

  get totalCitas(): number {
    return this.citasCliente.length;
  }

  seleccionar(id: string): void {
    this.seleccionadoId = id;
  }

  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
