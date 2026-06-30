# CRM Salón 💇‍♀️

CRM para un salón de belleza con login y control de servicios por rol.
Angular 22 (NgModules) · Tailwind CSS v3 · Flowbite · persistencia en **localStorage** (datos mock, sin backend).

## Cómo ejecutar

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/`. Los datos demo se cargan automáticamente la primera vez.

## Cuentas de prueba

La contraseña de todas las cuentas es **`123456`**. En la pantalla de login hay botones de acceso rápido.

| Rol | Correo |
|-----|--------|
| Supervisor | `supervisor@salon.com` |
| Estilista | `carla@salon.com` · `sofia@salon.com` |
| Cliente | `maria@salon.com` · `lucia@salon.com` · `jorge@salon.com` · `diana@salon.com` |

## Roles y funcionalidad

**Supervisor**
- Panel con métricas (citas por estado, calificación promedio, actividad reciente).
- Asignar servicios: elige cliente, estilista y **múltiples servicios con buscador** (peinado, lavado, tinte, manicura, pedicura, pestañas, cejas) + notas.
- Vista de clientes: servicio **actual** e **historial** completo de cada cliente, con sus calificaciones.

**Estilista**
- Lista de servicios que le fueron asignados, con filtros por estado.
- Cambia el estado de cada servicio: Pendiente → En progreso → Completado (o Cancelar).

**Cliente**
- Ve su **servicio actual** y su **historial**.
- **Califica** (1–5 estrellas + comentario) los servicios completados.

## Arquitectura

```
src/app/
├── core/
│   ├── models/models.ts          # tipos, catálogo de servicios, etiquetas
│   ├── data/seed.ts              # usuarios y citas demo
│   ├── services/                 # storage, seed, auth, user, cita, cita-vista
│   └── guards/                   # authGuard, roleGuard(role)
├── shared/
│   ├── shared-module.ts          # CommonModule, FormsModule, StarRating
│   ├── components/star-rating/   # componente de estrellas (lectura/edición)
│   └── layout/                   # navbar + shell autenticado
└── features/
    ├── auth/login/               # login + accesos demo
    ├── supervisor/               # panel, asignar, clientes  (lazy)
    ├── estilista/                # mis servicios             (lazy)
    └── cliente/                  # mis servicios + calificar (lazy)
```

- **Rutas protegidas** con `authGuard` (sesión) y `roleGuard` (rol), módulos de cada rol cargados con *lazy loading*.
- **Datos** en `localStorage` bajo el prefijo `crmsalon.`. Para reiniciar la data demo, borra esas claves desde DevTools o llama a `SeedService.reset()`.

## Notas

- El build de producción usa `optimization.fonts.inline: false` para no depender de Google Fonts en build (la fuente Inter se carga en runtime).
- La contraseña se guarda en texto plano: es solo para la demo local, **no usar tal cual en producción**.
