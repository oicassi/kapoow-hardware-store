import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../services/login.service';
import { NavigationService } from './../../services/navigation.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  produtosCarrinho: any[] = []
  constructor(
    public carrinhoServ: CarrinhoService,
    private _router: Router,
    private _navServ: NavigationService,
    private _loginServ: LoginService,
    private _snackBar: MatSnackBar
  ) {
    this.produtosCarrinho = carrinhoServ.getProdutosCarrinho();
    this._navServ.setShowSideNav('categories');
  }

  ngOnInit(): void {
  }

  navegarParaHome() {
    this._router.navigate(['']);
  }

  finalizarCompra() {
    this._router.navigate(['checkout']);
  }

}
