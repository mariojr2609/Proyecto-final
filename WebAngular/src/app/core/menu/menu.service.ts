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

const MENUITEMS = [
  {
    state: 'HOME',
    name: 'Home',
    type: 'link',
    icon: 'home'
  },
  {
    state: 'listar-recursos',
    name: 'Recursos',
    type: 'link',
    icon: 'library_books'
  },
  {
    state: 'listar-categorias',
    name: 'Categorías',
    type: 'link',
    icon: 'local_library'
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
