import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Calificacion, Cita, EstadoCita, NuevaCita } from '../models/models';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly _citas$ = new BehaviorSubject<Cita[]>([]);
  readonly citas$: Observable<Cita[]> = this._citas$.asObservable();

  constructor(private storage: StorageService) {
    this._citas$.next(this.storage.get<Cita[]>('citas', []));
  }

  private persist(list: Cita[]): void {
    this.storage.set('citas', list);
    this._citas$.next(list);
  }

  all(): Cita[] {
    return this._citas$.value;
  }

  byId(id: string): Cita | undefined {
    return this.all().find((c) => c.id === id);
  }

  byCliente(clienteId: string): Cita[] {
    return this.all().filter((c) => c.clienteId === clienteId);
  }

  byEstilista(estilistaId: string): Cita[] {
    return this.all().filter((c) => c.estilistaId === estilistaId);
  }

  crear(input: NuevaCita): Cita {
    const now = new Date().toISOString();
    const cita: Cita = {
      id: 'c' + Date.now().toString(36),
      clienteId: input.clienteId,
      estilistaId: input.estilistaId,
      servicios: input.servicios,
      estado: 'pendiente',
      notas: input.notas?.trim() || undefined,
      fechaCreacion: now,
      fechaActualizacion: now,
    };
    this.persist([cita, ...this.all()]);
    return cita;
  }

  actualizarEstado(id: string, estado: EstadoCita): void {
    this.persist(
      this.all().map((c) =>
        c.id === id ? { ...c, estado, fechaActualizacion: new Date().toISOString() } : c,
      ),
    );
  }

  calificar(id: string, estrellas: number, comentario?: string): void {
    const calificacion: Calificacion = {
      estrellas,
      comentario: comentario?.trim() || undefined,
      fecha: new Date().toISOString(),
    };
    this.persist(
      this.all().map((c) =>
        c.id === id ? { ...c, calificacion, fechaActualizacion: new Date().toISOString() } : c,
      ),
    );
  }

  eliminar(id: string): void {
    this.persist(this.all().filter((c) => c.id !== id));
  }
}
