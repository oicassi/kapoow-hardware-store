import { CarrinhoService } from './../../services/carrinho.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent implements OnInit {

  @Input() nome : string;
  @Input() imgUrl : string;
  @Input() rate : number;
  @Input() precoNormal : number;
  @Input() precoPromo : number;


  constructor(
    private _carrinhoServ: CarrinhoService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  getEstrelasPreenchidas() {
    return Array(this.rate);
  }

  getEstrelasVazias() {
    return Array(5 - this.rate);
  }

  comprarDireto() {
    // Adiciona o item ao carrinho
    const item = {
      nome: this.nome,
      imgUrl: this.imgUrl,
      rate: this.rate,
      precoNormal: this.precoNormal,
      precoPromo: this.precoPromo,
      quant: 1
    }

    this._carrinhoServ.adicionarProdutoCarrinho(item);
    this._snackBar.open(`Produto ${this.nome} adicionado ao carrinho`, 'Carrinho atualizado', {duration: 3000, panelClass:['snackbar-success']});
    
    // Navega para a página de carrinho de compras
    this._router.navigate(['carrinho']);
  }

  adicionarAoCarrinho() {
    // Adiciona o item ao carrinho
    const item = {
      nome: this.nome,
      imgUrl: this.imgUrl,
      rate: this.rate,
      precoNormal: this.precoNormal,
      precoPromo: this.precoPromo,
      quant: 1
    }

    this._carrinhoServ.adicionarProdutoCarrinho(item);
    this._snackBar.open(`Produto ${this.nome} adicionado ao carrinho`, 'Carrinho atualizado', {duration: 3000, panelClass:['snackbar-success']});
  }
  
  irParaProduto() {
    this._router.navigate(['produto']);
  }


}
