import { LoginService } from './../../services/login.service';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  categoriasContato = [
    'Dúvida sobre produto' , 'Dúvida sobre frete', 'Dúvida sobre pagamento', 'Elogio', 'Sugestão', 'Crítica', 'Outro'
  ]

  public msgForm: FormGroup;
  
  nome: string = '';
  email: string = '';
  mensagem: string = '';

  constructor(
    private _navServ: NavigationService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _loginServ: LoginService
  ) {
    this._navServ.setShowSideNav('contatoSide');
    if (this._loginServ.isLogged()) {
      const {nome, email} = this._loginServ.getUsuario();
      this.nome = nome;
      this.email = email;
    }
  }

  ngOnInit(): void {
    this.initForms();
  }

  enviarMensagem() {
    if (this.getFormValidationErrors(this.msgForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      return;
    }
    this._snackBar.open('Mensagem enviada com sucesso', 'Contato realizado', { duration: 5000, panelClass: ['snackbar-success'] });
    this.msgForm.get('mensagem').setValue('');
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

  initForms() {
    this.msgForm = this._fb.group({
      nome: [this.nome, Validators.required],
      email: [this.email, [Validators.required, this.emailValidator]],
      mensagem: ['', [Validators.required]]
    })
  }

  emailValidator(input: FormControl) {
    let condition = false;
    if (input.value) {
      condition = input.value.includes('@');
    }
    return (condition ? null : { email: true });
  }
}
