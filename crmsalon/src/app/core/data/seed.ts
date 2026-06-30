import { Cita, User } from '../models/models';

export const USERS_SEED: User[] = [
  { id: 'u1', nombre: 'Ana Torres', email: 'supervisor@salon.com', password: '123456', role: 'supervisor', telefono: '555-0101', color: '#db2777' },
  { id: 'u2', nombre: 'Carla Méndez', email: 'carla@salon.com', password: '123456', role: 'estilista', telefono: '555-0102', color: '#7c3aed' },
  { id: 'u3', nombre: 'Sofía Ramírez', email: 'sofia@salon.com', password: '123456', role: 'estilista', telefono: '555-0103', color: '#2563eb' },
  { id: 'u4', nombre: 'María López', email: 'maria@salon.com', password: '123456', role: 'cliente', telefono: '555-0201', color: '#059669' },
  { id: 'u5', nombre: 'Lucía Fernández', email: 'lucia@salon.com', password: '123456', role: 'cliente', telefono: '555-0202', color: '#d97706' },
  { id: 'u6', nombre: 'Jorge Pérez', email: 'jorge@salon.com', password: '123456', role: 'cliente', telefono: '555-0203', color: '#dc2626' },
  { id: 'u7', nombre: 'Diana Castro', email: 'diana@salon.com', password: '123456', role: 'cliente', telefono: '555-0204', color: '#0891b2' },
];

const iso = (d: string) => new Date(d).toISOString();

export const CITAS_SEED: Cita[] = [
  {
    id: 'c1', clienteId: 'u4', estilistaId: 'u2', servicios: ['peinado', 'lavado'],
    estado: 'completado', notas: 'Corte en capas',
    fechaCreacion: iso('2026-06-10T10:00'), fechaActualizacion: iso('2026-06-10T11:00'),
    calificacion: { estrellas: 5, comentario: 'Excelente servicio, quedé encantada.', fecha: iso('2026-06-10T12:00') },
  },
  {
    id: 'c2', clienteId: 'u4', estilistaId: 'u3', servicios: ['tinte'],
    estado: 'en_progreso', notas: 'Rubio ceniza',
    fechaCreacion: iso('2026-06-28T09:30'), fechaActualizacion: iso('2026-06-29T09:30'),
  },
  {
    id: 'c3', clienteId: 'u5', estilistaId: 'u2', servicios: ['manicura', 'pedicura'],
    estado: 'pendiente',
    fechaCreacion: iso('2026-06-29T08:00'), fechaActualizacion: iso('2026-06-29T08:00'),
  },
  {
    id: 'c4', clienteId: 'u6', estilistaId: 'u3', servicios: ['cejas', 'pestanas'],
    estado: 'completado',
    fechaCreacion: iso('2026-06-20T15:00'), fechaActualizacion: iso('2026-06-20T16:00'),
  },
  {
    id: 'c5', clienteId: 'u5', estilistaId: 'u2', servicios: ['peinado'],
    estado: 'completado',
    fechaCreacion: iso('2026-06-15T13:00'), fechaActualizacion: iso('2026-06-15T13:45'),
    calificacion: { estrellas: 4, comentario: 'Muy bien, repetiré.', fecha: iso('2026-06-15T14:00') },
  },
  {
    id: 'c6', clienteId: 'u7', estilistaId: 'u3', servicios: ['lavado', 'peinado', 'tinte'],
    estado: 'pendiente', notas: 'Evento de boda',
    fechaCreacion: iso('2026-06-29T11:00'), fechaActualizacion: iso('2026-06-29T11:00'),
  },
];
