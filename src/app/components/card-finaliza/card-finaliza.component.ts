import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-finaliza',
  templateUrl: './card-finaliza.component.html',
  styleUrls: ['./card-finaliza.component.css']
})
export class CardFinalizaComponent implements OnInit {

  @Input() nome : string;
  @Input() imgUrl: string;
  @Input() precoPromo : number;
  @Input() quantidade: number;

  constructor(
    public carrinhoServ: CarrinhoService,
  ) { }

  ngOnInit(): void {
  }

  alterarQuantidadeProduto() {
    this.carrinhoServ.setQuantItem(this.nome, this.quantidade);
  }
}
