import { DummyDataService } from './../../services/dummy-data.service';
import { LoginService, Usuario } from './../../services/login.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public isLogin: boolean = true;
  public isRegistro: boolean = false;
  public isSenha: boolean = false;
  public telefoneMask: string = '(00)00000-0000';
  public cepMask: string = '00000-000';
  public cpfMask: string = '000.000.000-00';
  public numeroMask: string = '0*';
  public processando: boolean = false;

  // Atributos dos formulários
  public email: string = '';
  public senha: string = '';
  public senhaRepetida: string = '';
  public telefone: string = '';
  public nome: string = '';
  public username: string = '';
  public cpf: string = '';
  public logradouro: string = '';
  public numero: string = '';
  public bairro: string = '';
  public complemento: string = '';
  public cep: string = '';
  public cidade: string = '';
  public uf: string = 'AC';


  public loginForm: FormGroup;
  public registroForm: FormGroup;
  public senhaForm: FormGroup;

  public ufs: string[] = []

  constructor(
    public loginServ: LoginService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    private _dmyServ: DummyDataService
  ) {
    this.initForms();
    this.ufs = this._dmyServ.getUfs();
  }

  ngOnInit(): void {
  }

  initForms() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', Validators.required]
    })

    this.registroForm = this._fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', Validators.required],
      senhaRepetida: ['', [Validators.required, this.senhaValidator.bind(this)]],
      telefone: ['', Validators.required],
      nome: ['', Validators.required],
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['',]
    })

    this.senhaForm = this._fb.group({
      email: ['', [Validators.required, this.emailValidator]]
    })
  }

  emailValidator(input: FormControl) {
    let condition = false;
    if (input.value) {
      condition = input.value.includes('@');
    }
    return (condition ? null : { email: true });
  }

  senhaValidator(input: FormControl) {
    const condition = (input.value === this.senha);
    return (condition ? null : { senhaDiferente: true });
  }

  alterarLoginNovoCadastro(acao: string) {
    switch (acao) {
      case 'isLogin':
        this.isLogin = true;
        this.isRegistro = false;
        this.isSenha = false;
        break;
      case 'isRegistro':
        this.isLogin = false;
        this.isRegistro = true;
        this.isSenha = false;
        break;
      case 'isSenha':
        this.isLogin = false;
        this.isRegistro = false;
        this.isSenha = true;
        break;
      default:
        this.isLogin = true;
        this.isRegistro = false;
        this.isSenha = false;
    }
  }

  loginUsuario() {
    if (this.processando) {
      return
    }
    this.processando = true;
    // Validações
    if (this.getFormValidationErrors(this.loginForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }

    // Se tudo certo chamar o serviço que faz o login
    const loginResp = this.loginServ.fazerLogin(this.email, this.senha);

    // Se deu erro emite um snackbar informando
    if (loginResp.status === 'fail') {
      this._snackBar.open(loginResp.msg, 'Erro no login', { duration: 5000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }

    // Se tudo correu bem fechar o modal
    this._snackBar.open('Usuário logado com sucesso', 'Login realizado', { duration: 5000, panelClass: ['snackbar-success'] });
    setTimeout(() => {
      this.processando = false;
      this.dialogRef.close()
    }, 1000);
  }

  registrarNovoUsuario() {
    if (this.processando) {
      return;
    }
    this.processando = true;
    // Validações dos campos
    if (this.getFormValidationErrors(this.registroForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return
    }
    // Verificar se o email já está cadastrado
    const registroResp = this.loginServ.findUsuarioByEmail(this.email, '');
    if (registroResp.status === 'ok') {
      this._snackBar.open('Email já cadatrado', 'Erro no registro', { duration: 5000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }

    // Adicionar o usuário
    let user: Usuario;
    user = {
      username: this.username,
      senha: this.senha,
      email: this.email,
      nome: this.nome
    }
    this.loginServ.addUsuario(user);

    // Fazer o login
    this.loginServ.setLogin(true);
    this.loginServ.setNomeUsuario(this.username);
    this.loginServ.setUsuario(user);

    // Fechar o modal
    this._snackBar.open('Usuário cadastrado com sucesso', 'Cadastro efetuado', { duration: 5000, panelClass: ['snackbar-success'] });
    setTimeout(() => {
      this.processando = false;
      this.dialogRef.close()
    }, 1000);
  }

  recuperarSenha() {
    if (this.processando) {
      return;
    }
    this.processando = true;
    // Validações dos campos
    if (this.getFormValidationErrors(this.senhaForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }
    // Verificar se o usuário existe
    const senhaResp = this.loginServ.findUsuarioByEmail(this.email, '');
    if (senhaResp.status === 'fail') {
      this._snackBar.open('Email não cadastrado no sistema', 'Erro recuperar senha', { duration: 5000, panelClass: ['snackbar-error'] });
      this.processando = false;
      return;
    }
    // Se tudo ok emitir um snackbar informando que a nova senha foi enviada para o email
    this._snackBar.open('Email de recuperação de senha enviado', 'Recuperação de senha solicitada', { duration: 5000, panelClass: ['snackbar-success'] });
    this.processando = false;
    this.alterarLoginNovoCadastro('isLogin');
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
}
