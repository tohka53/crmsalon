import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitaVista, CitaVistaService } from '../../../core/services/cita-vista.service';
import { CitaService } from '../../../core/services/cita.service';
import { AuthService } from '../../../core/services/auth.service';
import { EstadoCita, ESTADO_BADGE, ESTADO_LABEL } from '../../../core/models/models';

type Filtro = EstadoCita | 'todos';

@Component({
  selector: 'app-estilista-servicios',
  standalone: false,
  templateUrl: './mis-servicios.component.html',
})
export class EstilistaServiciosComponent implements OnInit, OnDestroy {
  todas: CitaVista[] = [];
  filtro: Filtro = 'todos';

  estadoLabel = ESTADO_LABEL;
  estadoBadge = ESTADO_BADGE;

  private estilistaId = '';
  private sub?: Subscription;

  constructor(
    private vista: CitaVistaService,
    private citas: CitaService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.estilistaId = this.auth.currentUser?.id ?? '';
    this.sub = this.vista.todas$().subscribe((list) => {
      this.todas = list
        .filter((c) => c.estilistaId === this.estilistaId)
        .sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get filtradas(): CitaVista[] {
    return this.filtro === 'todos' ? this.todas : this.todas.filter((c) => c.estado === this.filtro);
  }

  get pendientes(): number {
    return this.todas.filter((c) => c.estado === 'pendiente').length;
  }

  get enProgreso(): number {
    return this.todas.filter((c) => c.estado === 'en_progreso').length;
  }

  get completadas(): number {
    return this.todas.filter((c) => c.estado === 'completado').length;
  }

  setFiltro(f: Filtro): void {
    this.filtro = f;
  }

  iniciar(id: string): void {
    this.citas.actualizarEstado(id, 'en_progreso');
  }

  completar(id: string): void {
    this.citas.actualizarEstado(id, 'completado');
  }

  cancelar(id: string): void {
    this.citas.actualizarEstado(id, 'cancelado');
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
