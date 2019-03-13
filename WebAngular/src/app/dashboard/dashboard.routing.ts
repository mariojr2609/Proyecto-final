import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../core';
import { ListarGuarderiasComponent } from './listar-guarderias/listar-guarderias.component';
import { ListarCangurosComponent } from './listar-canguros/listar-canguros.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

export const DashboardRoutes: Routes = [
  {
    path: 'home',
    component: AdminLayoutComponent,
    children: 
    [
      {
        path: 'listar-guarderias',
        component: ListarGuarderiasComponent
      },
      {
        path: 'listar-canguros',
        component: ListarCangurosComponent
      },
      {
        path: 'listar-usuarios',
        component: ListarUsuariosComponent
      },
    ]
  }
];
