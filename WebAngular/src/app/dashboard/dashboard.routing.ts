import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../core';
import { ListarComponent } from '../dashboard/listar/listar.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: 
    [
      {
        path: 'listar',
        component: ListarComponent
      },
    ]
  }
];
