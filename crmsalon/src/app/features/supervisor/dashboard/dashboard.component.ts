import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitaVista, CitaVistaService } from '../../../core/services/cita-vista.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { EstadoCita, ESTADO_BADGE, ESTADO_LABEL } from '../../../core/models/models';

@Component({
  selector: 'app-supervisor-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class SupervisorDashboardComponent implements OnInit, OnDestroy {
  recientes: CitaVista[] = [];
  totalCitas = 0;
  totalClientes = 0;
  totalEstilistas = 0;
  promedio = 0;
  conteo: Record<EstadoCita, number> = { pendiente: 0, en_progreso: 0, completado: 0, cancelado: 0 };

  estadoLabel = ESTADO_LABEL;
  estadoBadge = ESTADO_BADGE;

  private sub?: Subscription;

  constructor(
    private vista: CitaVistaService,
    private users: UserService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.totalClientes = this.users.clientes().length;
    this.totalEstilistas = this.users.estilistas().length;
    this.sub = this.vista.todas$().subscribe((list) => {
      this.totalCitas = list.length;
      this.conteo = { pendiente: 0, en_progreso: 0, completado: 0, cancelado: 0 };
      list.forEach((c) => this.conteo[c.estado]++);

      const calificadas = list.filter((c) => c.calificacion);
      this.promedio = calificadas.length
        ? Math.round(
            (calificadas.reduce((s, c) => s + (c.calificacion?.estrellas ?? 0), 0) /
              calificadas.length) *
              10,
          ) / 10
        : 0;

      this.recientes = [...list]
        .sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion))
        .slice(0, 6);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
