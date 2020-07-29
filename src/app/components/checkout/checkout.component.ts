import { LoginService } from './../../services/login.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { DummyDataService } from './../../services/dummy-data.service';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  nomeEnd: string = ''
  logradouro: string = '';
  numero: string = '';
  bairro: string = '';
  complemento: string = '';
  cep: string = '';
  cidade: string = '';
  uf: string = '';

  nomeCartao: string = '';
  numeroCartao: string = '';
  nome: string = '';
  validade: string = '';
  cvv: string = ''

  numeroMask: string = '0*';
  cepMask: string = '00000-000';
  numeroCartaoMask: string = '0000-0000-0000-0000';
  validadeMask: string = '00/0000';
  cvvMask: string = '000';

  ufs: string[] = []

  processando: boolean = false;

  enderecoSelecionado:any = null;
  cartaoSelecionado:any = null;
  envioSelecionado:string = 'expresso'
  pagamentoSelecionado:string = 'cartao';
  numParcelas:number = 1;

  public enderecoForm: FormGroup;
  public cartaoForm: FormGroup;

  constructor(
    private _navServ: NavigationService,
    public dmyServ: DummyDataService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public carrinhoServ: CarrinhoService,
    private _router: Router,
    private _loginServ: LoginService
  ) {
    this._navServ.setShowSideNav('none');
    this.ufs = this.dmyServ.getUfs();
    this.initForms();
  }


  ngOnInit(): void {
  }


  selecionarEndereco(event) {
   const resp = this.dmyServ.buscarEnderecoPorNome(event);
   this.enderecoSelecionado = resp;
   this.desmontaObjetoEndereco(resp);
  }

  selecionarCartao(event) {
    const resp = this.dmyServ.buscarCartaoPorNome(event);
    this.cartaoSelecionado = resp;
    this.desmontaObjetoCartao(resp);
  }

  initForms() {
    this.enderecoForm = this._fb.group({
      nomeEnd: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['',]
    });

    this.cartaoForm = this._fb.group({
      numeroCartao: ['', Validators.required],
      nome: ['', Validators.required],
      validade: ['', Validators.required],
      cvv: ['', Validators.required],
    })
  }

  adicionarEndereco() {
    if (this.processando) {
      return;
    }
    this.processando = true;
    // Validação dos formuários
    if (this.getFormValidationErrors(this.enderecoForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }

    // Recuperar objeto para salvar
    const endereco = this.montarObjetoEndereco();

    // Tentar adicionar
    const resp = this.dmyServ.addEndereco(endereco);
    if (resp.status === 'fail') {
      this._snackBar.open(resp.msg, 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }
    this.enderecoSelecionado = endereco;
    this._snackBar.open(resp.msg, 'Alteração endereço', { duration: 2000, panelClass: ['snackbar-success'] });
    this.processando = false;
  }

  adicionarCartao() {
    if (this.processando) {
      return;
    }
    this.processando = true;

    // Validação dos formulários
    if (this.getFormValidationErrors(this.cartaoForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }

    // Recuperar objeto para salvar
    const cartao = this.montarObjetoCartao();

    // Tentar adicionar
    const resp = this.dmyServ.addCartao(cartao);
    if (resp.status === 'fail') {
      this._snackBar.open(resp.msg, 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }
    this.cartaoSelecionado = cartao;
    this._snackBar.open(resp.msg, 'Alteração cartão', { duration: 2000, panelClass: ['snackbar-success'] });
    this.processando = false;
  }


  getFormValidationErrors(formGroup: FormGroup) {
    let errors = false;
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors !== null) {
        errors = true;
      }
    });
    return errors;
  }

  montarObjetoEndereco() {
    return {
      nomeEnd: this.nomeEnd,
      endereco: {
        logradouro: this.logradouro,
        numero: this.numero,
        bairro: this.bairro,
        complemento: this.complemento,
        cep: this.cep,
        cidade: this.cidade,
        uf: this.uf
      }
    }
  }

  montarObjetoCartao() {
    const nomeA = this.numeroCartao.substring(0, 4);
    const nomeB = this.numeroCartao.substring(this.numeroCartao.length - 4);
    const nomeGerado = `${nomeA}-XXXX-XXXX-${nomeB}`;
    return {
      nomeCartao: nomeGerado,
      info: {
        numeroCartao: this.nomeCartao,
        nome: this.nome,
        validade: this.validade,
        cvv: this.cvv
      }
    }
  }

  desmontaObjetoEndereco(end:any) {
    const {nomeEnd} = end;
    const {logradouro, numero, bairro, complemento, cep, cidade, uf} = end.endereco;
    this.nomeEnd = nomeEnd;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.complemento = complemento;
    this.cep = cep;
    this.cidade = cidade;
    this.uf = uf;
  }

  desmontaObjetoCartao(card: any) {
    const {nomeCartao} = card;
    const {numeroCartao, nome, validade, cvv} = card.info;
    this.nomeCartao = nomeCartao;
    this.numeroCartao = numeroCartao;
    this.nome = nome;
    this.validade = validade;
    this.cvv = cvv;
  }

  isEnderecoSelecionado() {
    if (this.logradouro && this.numero && this.bairro && this.complemento && this.cidade && this.cep && this.uf) {
      return true;
    }
    false;
  }

  finalizarCompra(){
    if (!this._loginServ.isLogged()) {
      this._snackBar.open('Faça o login para poder finalizar a compra', 'Erro login', { duration: 5000, panelClass: ['snackbar-error'] });
      return
    }
    if (!this.enderecoSelecionado) {
      this._snackBar.open('Selecione um endereço ou cadastre um novo', 'Erro nas validações', { duration: 2000, panelClass: ['snackbar-error'] });
      return;
    }
    if (this.pagamentoSelecionado === 'cartao' && !this.cartaoSelecionado) {
      this._snackBar.open('Selecione um cartão ou cadastre um novo', 'Erro nas validações', { duration: 2000, panelClass: ['snackbar-error'] });
      return;
    }
    const dataRaw = new Date();
    const dataPedido = `${dataRaw.getDate()}/${this.addLeftZero((dataRaw.getMonth() + 1).toString(), 2)}/${dataRaw.getFullYear()}`;
    const dataPedidoComp = `${dataRaw.getFullYear()}${this.addLeftZero((dataRaw.getMonth() + 1).toString(), 2)}${dataRaw.getDate()}`;
    const numPedido = this.dmyServ.getNumPedidoGeral();
    this.dmyServ.setNumPedidoGeral(numPedido + 1);
    const nfe = this.dmyServ.getNfeGeral();
    this.dmyServ.setNfeGeral(nfe + 1);

    const novoPedido = {
      numPedido: numPedido.toString(),
      data: dataPedido,
      pagamento: (this.pagamentoSelecionado === 'cartao' ? 'Cartão de crédito' : 'Boleto Bancário'),
      status: 'Em processamento',
      nfe: `${nfe}/1`,
      dataComp: dataPedidoComp
    }

    this.dmyServ.addPedido(novoPedido);
    this.carrinhoServ.limparCarrinho();
    this._snackBar.open('Compra realizada com sucesso!', 'Compra efetuada', { duration: 5000, panelClass: ['snackbar-success'] });
    setTimeout(() => {
      console.log('Redirecionar para área do cliente');
      this._router.navigate(['cliente']);
    }, 3000);
  }
  

  navegar(rota: string) {
    this._router.navigate([rota]);
  }

  getValorEnvio() {
    if (this.envioSelecionado === 'expresso') {
      return 23;
    }
    return 0;
  }

  addLeftZero(valor: string, quant: number) {
    let novoValor = '';
    for (let i = 0; i < (quant - valor.length); i++) {
      novoValor += '0';
    }
    return novoValor + valor;
  }

}
