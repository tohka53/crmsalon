import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'supervisor',
        canActivate: [roleGuard('supervisor')],
        loadChildren: () =>
          import('./features/supervisor/supervisor-module').then((m) => m.SupervisorModule),
      },
      {
        path: 'estilista',
        canActivate: [roleGuard('estilista')],
        loadChildren: () =>
          import('./features/estilista/estilista-module').then((m) => m.EstilistaModule),
      },
      {
        path: 'cliente',
        canActivate: [roleGuard('cliente')],
        loadChildren: () =>
          import('./features/cliente/cliente-module').then((m) => m.ClienteModule),
      },
      { path: '', pathMatch: 'full', redirectTo: '/login' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
