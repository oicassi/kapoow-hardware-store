import { LoginService } from './../../services/login.service';
import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-side',
  templateUrl: './cliente-side.component.html',
  styleUrls: ['./cliente-side.component.css']
})
export class ClienteSideComponent implements OnInit {

  nome: string = '';
  email: string = '';
  profilePic="/assets/extra/profile.png";

  constructor(
    public loginServ: LoginService,
    public navServ: NavigationService
  ) {
    if (this.loginServ.isLogged()) {
      const {nome, email} = this.loginServ.getUsuario();
      this.nome = nome;
      this.email = email;
    }
  }

  ngOnInit(): void {
  }

  mudarTab(valor:number) {
    this.navServ.setClienteTabIndex(valor);
  }

}
