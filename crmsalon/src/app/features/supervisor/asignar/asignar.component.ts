import { Component } from '@angular/core';
import { CitaService } from '../../../core/services/cita.service';
import { UserService } from '../../../core/services/user.service';
import { SERVICIOS, Servicio, ServicioId, User } from '../../../core/models/models';

@Component({
  selector: 'app-asignar',
  standalone: false,
  templateUrl: './asignar.component.html',
})
export class AsignarComponent {
  clientes: User[] = [];
  estilistas: User[] = [];
  servicios = SERVICIOS;

  clienteId = '';
  estilistaId = '';
  seleccionados = new Set<ServicioId>();
  busqueda = '';
  notas = '';
  exito = '';

  constructor(private users: UserService, private citas: CitaService) {
    this.clientes = users.clientes();
    this.estilistas = users.estilistas();
  }

  get filtrados(): Servicio[] {
    const q = this.busqueda.trim().toLowerCase();
    return q ? this.servicios.filter((s) => s.nombre.toLowerCase().includes(q)) : this.servicios;
  }

  get serviciosSeleccionados(): Servicio[] {
    return this.servicios.filter((s) => this.seleccionados.has(s.id));
  }

  get total(): number {
    return this.serviciosSeleccionados.reduce((sum, s) => sum + s.precio, 0);
  }

  get duracion(): number {
    return this.serviciosSeleccionados.reduce((sum, s) => sum + s.duracion, 0);
  }

  get valido(): boolean {
    return !!this.clienteId && !!this.estilistaId && this.seleccionados.size > 0;
  }

  isSel(id: ServicioId): boolean {
    return this.seleccionados.has(id);
  }

  toggle(id: ServicioId): void {
    if (this.seleccionados.has(id)) this.seleccionados.delete(id);
    else this.seleccionados.add(id);
  }

  quitar(id: ServicioId): void {
    this.seleccionados.delete(id);
  }

  asignar(): void {
    if (!this.valido) return;
    const cliente = this.users.byId(this.clienteId);
    this.citas.crear({
      clienteId: this.clienteId,
      estilistaId: this.estilistaId,
      servicios: [...this.seleccionados],
      notas: this.notas,
    });
    this.exito = `Servicio asignado a ${cliente?.nombre ?? 'el cliente'} correctamente.`;
    this.clienteId = '';
    this.estilistaId = '';
    this.seleccionados.clear();
    this.notas = '';
    this.busqueda = '';
    setTimeout(() => (this.exito = ''), 4000);
  }
}
