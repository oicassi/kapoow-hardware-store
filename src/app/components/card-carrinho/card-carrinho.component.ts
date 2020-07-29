import { MatSnackBar } from '@angular/material/snack-bar';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-carrinho',
  templateUrl: './card-carrinho.component.html',
  styleUrls: ['./card-carrinho.component.css']
})
export class CardCarrinhoComponent implements OnInit {

  @Input() nome : string;
  @Input() rate : number;
  @Input() imgUrl: string;
  @Input() precoNormal : number;
  @Input() precoPromo : number;
  @Input() quant: number;
  @Input() id: number;

  quantidade:number = 1;

  constructor(
    public carrinhoServ: CarrinhoService,
    private _snackBar: MatSnackBar,
  ) {
    
  }

  ngOnInit(): void {
    this.quantidade = this.quant;
  }

  alterarQuantidadeProduto() {
    this.carrinhoServ.setQuantItem(this.nome, this.quantidade);
  }

  getEstrelasPreenchidas() {
    return Array(this.rate);
  }

  getEstrelasVazias() {
    return Array(5 - this.rate);
  }

  removerItem() {
    const resp = this.carrinhoServ.removerItem(this.nome);
    if (resp && resp.status === 'ok') {
      this._snackBar.open(resp.msg, 'Carrinho atualizado', {duration: 3000, panelClass:['snackbar-success']});
      return;
    }
    this._snackBar.open(resp.msg, 'Erro', {duration: 3000, panelClass:['snackbar-error']});
  }

}
