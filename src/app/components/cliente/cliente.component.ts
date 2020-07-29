import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { DummyDataService } from 'src/app/services/dummy-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  numeroMask: string = '0*';
  cepMask: string = '00000-000';
  telefoneMask: string = '(00)00000-0000';
  cpfMask: string='000.000.000-00';

  usuario: any = {};
  endereco: any = {};

  ufs: string[] = [];
  isEdit: boolean = false;
  isCadastroEdit: boolean = false;
  uf: string = 'PR';

  public enderecoForm: FormGroup;
  public cadastroForm: FormGroup;

  pedidos: any[] = [];
  protocolos: any[] = [];
  trocasGarantias: any[] = [];

  pedidosColumns: string[] = ['numPedido', 'data', 'pagamento', 'status', 'nfe'];
  protocolosColumns: string[] = ['numProtocolo', 'data', 'status', 'detalhes'];
  trocasGarantiasColumns: string[] = ['numPedido', 'data', 'nfe', 'status'];


  constructor(
    public navServ: NavigationService,
    public dmyServ: DummyDataService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _loginServ: LoginService,


  ) {
    this.navServ.setShowSideNav('clienteSide');
    this.ufs = this.dmyServ.getUfs();
    this.usuario = this._loginServ.getUsuario();
    this.endereco = this.dmyServ.getListaEnderecos()[0];
    this.pedidos = this.dmyServ.getListaPedidos();
    this.protocolos = this.dmyServ.getListaProtocolos();
    this.trocasGarantias = this.dmyServ.getTrocasGarantias();
    this.setOrdemPedidos();
    this.initForms();
  }

  ngOnInit(): void {
  }

  setOrdemPedidos() {
    this.pedidos = this.pedidos.sort((a, b) => b.dataComp - a.dataComp);
  }

  initForms() {

    const {email, nome, username} = this.usuario;
    const {nomeEnd} = this.endereco;
    const {logradouro, numero, bairro, complemento, cep, cidade, uf} = this.endereco.endereco

    this.enderecoForm = this._fb.group({
      nomeEnd: [nomeEnd, Validators.required],
      logradouro: [logradouro, Validators.required],
      numero: [numero, Validators.required],
      bairro: [bairro, Validators.required],
      complemento: [complemento, Validators.required],
      cep: [cep, Validators.required],
      cidade: [cidade, Validators.required],
      uf: [uf]
    });

    this.cadastroForm = this._fb.group({
      nome: [nome, Validators.required],
      email: [email, [Validators.required, this.emailValidator]],
      username: [username, Validators.required],
      telefone: ['41999999999', Validators.required],
      cpf:['12345678900', Validators.required]
    })
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

  emailValidator(input: FormControl) {
    let condition = false;
    if (input.value) {
      condition = input.value.includes('@');
    }
    return (condition ? null : { email: true });
  }

  cancelarEdicaoEndereco() {
    this.isEdit = false;

    const {nomeEnd} = this.endereco;
    const {logradouro, numero, bairro, complemento, cep, cidade, uf} = this.endereco.endereco;

    this.enderecoForm.get('nomeEnd').setValue(nomeEnd);
    this.enderecoForm.get('logradouro').setValue(logradouro);
    this.enderecoForm.get('numero').setValue(numero);
    this.enderecoForm.get('bairro').setValue(bairro);
    this.enderecoForm.get('complemento').setValue(complemento);
    this.enderecoForm.get('cep').setValue(cep);
    this.enderecoForm.get('cidade').setValue(cidade);
    this.enderecoForm.get('uf').setValue(uf);
  }

  cancelarEdicaoCadastro() {
    this.isCadastroEdit = false;

    const {username, email, nome} = this.usuario;

    this.cadastroForm.get('nome').setValue(nome);
    this.cadastroForm.get('email').setValue(email);
    this.cadastroForm.get('username').setValue(username);
    this.cadastroForm.get('telefone').setValue('41999999999');
    this.cadastroForm.get('cpf').setValue('12345678900');
  }

  salvarEndereco() {
    if (this.getFormValidationErrors(this.enderecoForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 5000, panelClass: ['snackbar-error'] });
      return;
    }
    this._snackBar.open('Edição do endereço realizada com sucesso', 'Edição endereço', { duration: 5000, panelClass: ['snackbar-success'] });
    this.isEdit = false;
  }

  salvarCadastro() {
    if (this.getFormValidationErrors(this.cadastroForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 5000, panelClass: ['snackbar-error'] });
      return;
    }
    const nome = this.cadastroForm.get('nome').value;
    const email = this.cadastroForm.get('email').value;
    const username = this.cadastroForm.get('username').value;

    let resp = this._loginServ.findUsuarioByEmail(this.usuario.email, this.usuario.senha);
    if (resp.status === 'fail') {
      this._snackBar.open('Usuário não encontrado na base de dados. Contato o administrador', 'Erro', { duration: 5000, panelClass: ['snackbar-error'] });
      return;
    }
    let novoUsuario = resp.usuario;
    novoUsuario.nome = nome;
    novoUsuario.email = email;
    novoUsuario.username = username;
    this._loginServ.editUsuario(novoUsuario);
    this._snackBar.open('Edição do cadastro realizada com sucesso', 'Edição cadastro', { duration: 5000, panelClass: ['snackbar-success'] });
    this.usuario = novoUsuario;
    this.isCadastroEdit = false;
  }

  editarCadastro() {
    this.isCadastroEdit = true;
    this.cadastroForm.get('nome').markAsDirty;
  }

  editarEndereco() {
    this.isEdit = true;
  }
}
