import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {

  componentes = ['Coolers', 'Discos Rígidos', 'Drivers', 'Memórias RAM', 'Placas-Mãe', 'Placas de Som', 'Placas de Vídeo', 'Processadores'];
  perifericos = ['Acessórios', 'Adaptadores', 'Cabos', 'Energia', 'Gabinetes', 'Headsets', 'Monitores', 'Mouses', 'Teclados', 'Softwares', 'Som'];
  categoriaSelecionada:string;

  constructor(
    private _navServ: NavigationService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this._navServ.setCategoriaSelecionada('');
  }

  selecionarCategoria(categoria: string) {
    this._navServ.setCategoriaSelecionada(categoria);
    this._router.navigate(['/filtrado', categoria]);
  }

}
