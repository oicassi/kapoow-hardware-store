import { CarrinhoService } from './../../services/carrinho.service';
import { NavigationService } from './../../services/navigation.service';
import { LoginComponent } from './../login/login.component';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public loginServ: LoginService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _navServ: NavigationService,
    public carrinhoServ: CarrinhoService
  ) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '65%';
    dialogConfig.height = '90%';
    dialogConfig.panelClass = 'custom-modalBox';
    dialogConfig.backdropClass = 'custom-backdrop';
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }

  efetuarLogout() {
    this.loginServ.setLogin(false);
    this.loginServ.setNomeUsuario('');
    this.loginServ.setUsuario(null);
    this._router.navigate(['']);
    this._snackBar.open('Logout realizado com sucesso', 'Volte logo ;)', {duration:5000, panelClass:['snackbar-success']})
  }
  
  navegar(destino: string) {
    if (destino === 'cliente' && !this.loginServ.isLogged()) {
      this._snackBar.open('Faça o login para poder acessar a área do cliente', 'Erro login', {duration:5000, panelClass:['snackbar-error']})
      return;
    }
    this._router.navigate([destino]);
  }
}
