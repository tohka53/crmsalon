import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitaVista, CitaVistaService } from '../../../core/services/cita-vista.service';
import { CitaService } from '../../../core/services/cita.service';
import { AuthService } from '../../../core/services/auth.service';
import { ESTADO_BADGE, ESTADO_LABEL } from '../../../core/models/models';

@Component({
  selector: 'app-cliente-servicios',
  standalone: false,
  templateUrl: './mis-servicios.component.html',
})
export class ClienteServiciosComponent implements OnInit, OnDestroy {
  nombre = '';
  activos: CitaVista[] = [];
  historial: CitaVista[] = [];

  estadoLabel = ESTADO_LABEL;
  estadoBadge = ESTADO_BADGE;

  ratingDraft: Record<string, number> = {};
  comentarioDraft: Record<string, string> = {};
  mensaje = '';

  private clienteId = '';
  private sub?: Subscription;

  constructor(
    private vista: CitaVistaService,
    private citas: CitaService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    this.clienteId = user?.id ?? '';
    this.nombre = user?.nombre ?? '';
    this.sub = this.vista.todas$().subscribe((list) => {
      const mias = list
        .filter((c) => c.clienteId === this.clienteId)
        .sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion));
      this.activos = mias.filter((c) => c.estado === 'pendiente' || c.estado === 'en_progreso');
      this.historial = mias.filter((c) => c.estado === 'completado' || c.estado === 'cancelado');
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  setRating(id: string, val: number): void {
    this.ratingDraft[id] = val;
  }

  calificar(c: CitaVista): void {
    const estrellas = this.ratingDraft[c.id] ?? 0;
    if (estrellas < 1) return;
    this.citas.calificar(c.id, estrellas, this.comentarioDraft[c.id]);
    this.mensaje = '¡Gracias por calificar tu servicio!';
    setTimeout(() => (this.mensaje = ''), 3500);
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
