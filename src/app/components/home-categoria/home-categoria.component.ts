import { DummyDataService } from './../../services/dummy-data.service';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.css']
})
export class HomeCategoriaComponent implements OnInit {

  categoria: string = '';
  produtosFiltrados: any[] = [];

  constructor(
    private _navServ: NavigationService,
    private _route: ActivatedRoute,
    private _dmyServ: DummyDataService  
  ) {
    this.produtosFiltrados = this._dmyServ.getListaProdutosFiltrados();
    this._navServ.setShowSideNav('categories');
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
    })
  }

}
