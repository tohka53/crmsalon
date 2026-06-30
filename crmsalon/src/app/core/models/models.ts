// ===== Roles =====
export type Role = 'supervisor' | 'estilista' | 'cliente';

export const ROLE_LABEL: Record<Role, string> = {
  supervisor: 'Supervisor',
  estilista: 'Estilista',
  cliente: 'Cliente',
};

// ===== Usuario =====
export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string; // solo para mock local
  role: Role;
  telefono?: string;
  color?: string; // color de avatar
}

// ===== Catálogo de servicios =====
export type ServicioId =
  | 'peinado'
  | 'lavado'
  | 'tinte'
  | 'manicura'
  | 'pedicura'
  | 'pestanas'
  | 'cejas';

export interface Servicio {
  id: ServicioId;
  nombre: string;
  icono: string; // emoji
  precio: number; // MXN
  duracion: number; // minutos
}

export const SERVICIOS: Servicio[] = [
  { id: 'peinado', nombre: 'Peinado', icono: '💇‍♀️', precio: 250, duracion: 45 },
  { id: 'lavado', nombre: 'Lavado', icono: '🚿', precio: 120, duracion: 20 },
  { id: 'tinte', nombre: 'Tinte', icono: '🎨', precio: 600, duracion: 90 },
  { id: 'manicura', nombre: 'Manicura', icono: '💅', precio: 200, duracion: 40 },
  { id: 'pedicura', nombre: 'Pedicura', icono: '🦶', precio: 250, duracion: 50 },
  { id: 'pestanas', nombre: 'Pestañas', icono: '👁️', precio: 400, duracion: 60 },
  { id: 'cejas', nombre: 'Cejas', icono: '✏️', precio: 150, duracion: 25 },
];

export function servicioById(id: ServicioId): Servicio {
  return SERVICIOS.find((s) => s.id === id) ?? SERVICIOS[0];
}

// ===== Cita / Asignación =====
export type EstadoCita = 'pendiente' | 'en_progreso' | 'completado' | 'cancelado';

export const ESTADO_LABEL: Record<EstadoCita, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completado: 'Completado',
  cancelado: 'Cancelado',
};

// Clases Tailwind para badge de estado
export const ESTADO_BADGE: Record<EstadoCita, string> = {
  pendiente: 'bg-amber-100 text-amber-800',
  en_progreso: 'bg-blue-100 text-blue-800',
  completado: 'bg-green-100 text-green-800',
  cancelado: 'bg-slate-200 text-slate-600',
};

export interface Calificacion {
  estrellas: number; // 1..5
  comentario?: string;
  fecha: string; // ISO
}

export interface Cita {
  id: string;
  clienteId: string;
  estilistaId: string;
  servicios: ServicioId[];
  estado: EstadoCita;
  notas?: string;
  fechaCreacion: string; // ISO
  fechaActualizacion: string; // ISO
  calificacion?: Calificacion;
}

export interface NuevaCita {
  clienteId: string;
  estilistaId: string;
  servicios: ServicioId[];
  notas?: string;
}
