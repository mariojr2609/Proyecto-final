import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = 
[
  {
    state: 'listar-guarderias',
    name: 'Guarderias',
    type: 'link',
    icon: 'location_city'
  },
  {
    state: 'listar-canguros',
    name: 'Canguros',
    type: 'link',
    icon: 'child_care'
  },
  {
    state: 'listar-usuarios',
    name: 'Usuarios',
    type: 'link',
    icon: 'people'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
