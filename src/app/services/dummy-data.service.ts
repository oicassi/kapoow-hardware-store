import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  // Lista de produtos que são mostrados nos cards
  private listaProdutos: any[] = [
    {nome:'SSD ZenDisc 1TB, SATA', imgUrl: '/assets/imgs/1.jpg', rate: 4, precoNormal: 1320.40, precoPromo: 880.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Placa de vídeo Z-Force Galax', imgUrl:'/assets/imgs/3.jpg', rate: 5, precoNormal: 3420.60, precoPromo: 2990.80},
    {nome:'SSD Kingdons 480GB, SATA', imgUrl:'/assets/imgs/4.jpg', rate: 3, precoNormal: 579.00, precoPromo: 430.00},
    {nome:'Headset Snake Feroz 6D', imgUrl:'/assets/imgs/5.jpg', rate: 4, precoNormal: 420.00, precoPromo: 350.0},
    {nome:'Placa mãe Osiris Gaming Extreme', imgUrl:'/assets/imgs/6.jpg', rate: 5, precoNormal: 920.10, precoPromo: 790.50},
    {nome:'Teclado mecânico mech 5', imgUrl:'/assets/imgs/7.jpg', rate: 3, precoNormal: 220.90, precoPromo: 188.80},
    {nome:'WaterCooler Água em festa', imgUrl:'/assets/imgs/8.jpg', rate: 4, precoNormal: 550.40, precoPromo: 410.80},
    {nome:'Memória Ram ViperX 16GB', imgUrl:'/assets/imgs/9.jpg', rate: 5, precoNormal: 890.40, precoPromo: 790.80},
  ]

  private listaProdutosFiltrados: any[] = [
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
    {nome:'Processador ANT Raise 5', imgUrl:'/assets/imgs/2.jpg', rate: 5, precoNormal: 1560.20, precoPromo: 1350.80},
  ]

  private produtoSelecionado : any = {
    nome:'Processador ANT Raise 5', 
    rate: 5,
    precoNormal: 1560.20,
    precoPromo: 1350.80,
    imgs: [
      '/assets/imgs-detalhe/a.jpg',
      '/assets/imgs-detalhe/b.jpg',
      '/assets/imgs-detalhe/c.jpg',
      '/assets/imgs-detalhe/d.jpg',
    ]
  }

  private ufs: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ]

  private listaEnderecos: any[] = [
    {nomeEnd:'Principal', endereco: { logradouro: 'Rua Mirimbim Birim', numero: '420', bairro:'Centro', complemento:'Apt 999', cep: '800900-909', cidade: 'Curitiba', uf:'PR'}},
    {nomeEnd:'Trabalho', endereco: { logradouro: 'Avenida Sete de Setembro', numero: '2451', bairro:'Centro', complemento:'7th Avenue', cep: '80130-250', cidade: 'Curitiba', uf:'PR'}},
  ]

  private listaCartoes: any[] = [
    {nomeCartao:'1234-XXXX-XXXX-4321', info: {numeroCartao:'1234567809874321', nome: 'Emiéli das Neves', validade: '122027', cvv: '123'}},
    {nomeCartao:'5876-XXXX-XXXX-9786', info: {numeroCartao:'5876057723329786', nome: 'Arnaldo das Neves', validade: '072022', cvv: '889'}},
  ]

  private listaPedidos: any[] = [
    {numPedido: '202050019', data: '12/03/2020', pagamento:'Boleto Bancário', status:'Concluído', nfe:'834.231/1', dataComp:'20200312'},
    {numPedido: '202020401', data: '03/01/2020', pagamento:'Cartão de crédito', status:'Concluído', nfe:'535.241/1', dataComp:'20200103'},
    {numPedido: '201990319', data: '24/11/2019', pagamento:'Cartão de crédito', status:'Cancelado com devolução do valor', nfe:'434.434/1', dataComp:'20191124'},
    {numPedido: '201970819', data: '10/09/2019', pagamento:'Boleto Bancário', status:'Concluído', nfe:'229.530/1', dataComp:'20190910'},
  ]

  private listaProtocolos: any[] = [
    {numProtocolo: '4535', data: '06/04/2020', status: 'Aguardando cliente'},
    {numProtocolo: '1252', data: '22/05/2017', status: 'Concluído'},
  ]

  private trocasGarantias: any[] = [
    {numPedido:'201970819', data: '14/09/2019', nfe: '229.530/1', status:'Troca realizada'}
  ]

  numPedidoGeral = 202050020;
  nfeGeral = 834232;

  constructor() { }

  getListaProdutos():any[] {
    return this.listaProdutos; 
  }

  getListaProdutosFiltrados() : any[] {
    return this.listaProdutosFiltrados
  }

  getProdutoSelecionado() {
    return this.produtoSelecionado;
  }

  addEndereco(novoEnd) {
    const {nomeEnd} = novoEnd;
    const {logradouro, numero} = novoEnd.endereco;
    const i = this.listaEnderecos.findIndex(end => {
      return end.nomeEnd === nomeEnd && end.endereco.logradouro === logradouro && end.endereco.numero === numero;
    })
    if (i > -1) {
      return {status: 'fail', msg:'Endereço já cadastrado'};
    }
    this.listaEnderecos.push(novoEnd);
    return {status: 'ok', msg: 'Endereço adicionado com sucesso'};
  }

  getListaEnderecos() {
    return this.listaEnderecos;
  }

  getUfs() {
    return this.ufs;
  }

  buscarEnderecoPorNome(nome: string) {
    const endereco = this.listaEnderecos.find(end => end.nomeEnd === nome);
    return endereco;
  }

  buscarCartaoPorNome(nome: string) {
    const cartao = this.listaCartoes.find(card => card.nomeCartao === nome);
    return cartao;
  }

  getListaCartoes() {
    return this.listaCartoes;
  }

  addCartao(cartao: any) {
    const {nomeCartao} = cartao;
    const i = this.listaCartoes.findIndex(card => card.nomeCartao === nomeCartao);
    if (i > -1) {
      return {status: 'fail', msg:'Cartão já cadastrado'};
    }
    this.listaCartoes.push(cartao);
    return {status: 'ok', msg: 'Cartão adicionado com sucesso'};
  }

  getListaPedidos() {
    return this.listaPedidos;
  }

  addPedido(pedido: any) {
    this.listaPedidos.push(pedido);
  }

  getListaProtocolos() {
    return this.listaProtocolos;
  }

  getTrocasGarantias() {
    return this.trocasGarantias;
  }

  getNumPedidoGeral() {
    return this.numPedidoGeral;
  }

  setNumPedidoGeral(num: number) {
    this.numPedidoGeral = num;
  }

  getNfeGeral() {
    return this.nfeGeral;
  }

  setNfeGeral(nfe:number) {
    this.nfeGeral = nfe;
  }

}
