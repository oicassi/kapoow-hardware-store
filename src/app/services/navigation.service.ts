import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private categoriaSelecionada: string = '';
  private produtoSelecionado: any;
  private sideNav: string = 'categories';

  private clienteTabIndex = 0;

  constructor() { }

  getCategoriaSelecionada() {
    return this.categoriaSelecionada;
  }

  setCategoriaSelecionada(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  getShowSideNav() {
    return this.sideNav;
  }

  setShowSideNav(comp: string) {
    this.sideNav = comp;
  }

  setClienteTabIndex(index: number) {
    this.clienteTabIndex = index;
  }

  getClienteTabIndex() {
    return this.clienteTabIndex;
  }
}
