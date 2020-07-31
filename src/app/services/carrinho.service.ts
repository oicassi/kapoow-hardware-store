import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private produtosCarrinho: any[] = [];

  constructor() { }

  getProdutosCarrinho() {
    return this.produtosCarrinho;
  }

  adicionarProdutoCarrinho(produto:any) {
    const i = this.produtosCarrinho.findIndex(prod =>prod.nome === produto.nome);
    
    if (i > -1) {
      this.produtosCarrinho[i].quant += produto.quant;
      return;
    }
    this.produtosCarrinho.push(produto);
  }

  getQuantidadeProdutosCarrinho() {
    const quantidadeItems = this.produtosCarrinho.reduce((acc, curr) => {
      return acc += curr.quant
    }, 0)
    return quantidadeItems
  }

  getValorTotalBoleto() {
    const valor = this.produtosCarrinho.reduce((acc, curr) => {
      return acc + curr.precoPromo * curr.quant;
    }, 0)
    return valor;
  }

  getValorTotalCartao() {
    let valor = this.produtosCarrinho.reduce((acc, curr) => {
      return acc + curr.precoPromo * curr.quant;
    }, 0)
    valor += (valor * 0.1)
    return valor;
  }

  setQuantItem(produto: string, quant: number) {
    const i = this.produtosCarrinho.findIndex(prod => prod.nome === produto);
    if (i > -1) {
      this.produtosCarrinho[i].quant = quant;
      return;
    }
    alert('Erro atualizar quantidade. Produto não encontrado no carriho');
  }

  removerItem(produto:string) {
    const i = this.produtosCarrinho.findIndex(prod => prod.nome === produto);
    if (i > -1) {
      const removed = this.produtosCarrinho.splice(i, 1);
      return {status: 'ok', msg:`Produto ${produto} removido do carrinho`};
    }
    return {status: 'fail', msg:`Ocorreu um erro ao tentar remover o produto ${produto} do carrinho`}
  }

  limparCarrinho(){
    this.produtosCarrinho = [];
  }
}
