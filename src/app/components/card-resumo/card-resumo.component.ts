import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-resumo',
  templateUrl: './card-resumo.component.html',
  styleUrls: ['./card-resumo.component.css']
})
export class CardResumoComponent implements OnInit {

  @Input() nome : string;
  @Input() rate : number;
  @Input() imgUrl: string;
  @Input() precoNormal : number;
  @Input() precoPromo : number;

  quantidade: number = 1;

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
      quant: (this.quantidade > 0 ? this.quantidade : 1)
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
      quant: (this.quantidade > 0 ? this.quantidade : 1)
    }

    this._carrinhoServ.adicionarProdutoCarrinho(item);
    this._snackBar.open(`Produto ${this.nome} adicionado ao carrinho`, 'Carrinho atualizado', {duration: 3000, panelClass:['snackbar-success']});
  }

}
