import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita, Servicio, servicioById, User } from '../models/models';
import { CitaService } from './cita.service';
import { UserService } from './user.service';

/** Cita enriquecida con datos de cliente, estilista y servicios. */
export interface CitaVista extends Cita {
  cliente?: User;
  estilista?: User;
  serviciosDetalle: Servicio[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CitaVistaService {
  constructor(private citas: CitaService, private users: UserService) {}

  private enriquecer = (c: Cita): CitaVista => {
    const serviciosDetalle = c.servicios.map(servicioById);
    return {
      ...c,
      cliente: this.users.byId(c.clienteId),
      estilista: this.users.byId(c.estilistaId),
      serviciosDetalle,
      total: serviciosDetalle.reduce((sum, s) => sum + s.precio, 0),
    };
  };

  /** Stream reactivo de todas las citas enriquecidas. */
  todas$(): Observable<CitaVista[]> {
    return this.citas.citas$.pipe(map((list) => list.map(this.enriquecer)));
  }
}
