import { Injectable } from '@angular/core';

export interface Usuario {
  username: string;
  email: string;
  senha: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuarioLogado : boolean = false;
  username : string = '';
  usuario: Usuario;
  usuarios: Usuario[] = [
    {username: 'carlos m4rcos', email: 'karlmarx@outlook.com', senha:'treta', nome:'Carlos Marcos'},
    {username: 'andreG4m3r', email: 'andre@andre.com', senha:'1234', nome: 'André Neptune'}
  ]

  constructor() { }

  isLogged() {
    return this.usuarioLogado;
  }

  setLogin(opcao: boolean) {
    this.usuarioLogado = opcao;
  }

  getNomeUsuario() {
    return this.username;
  }

  setNomeUsuario(nome: string) {
    this.username = nome;
  }

  addUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  setUsuario(user: Usuario) {
    this.usuario = user;
  }

  getUsuario() {
    return this.usuario;
  }

  findUsuarioByEmail(email: string, senha: string) {
    let i: number = -1;
    if (senha === '') {
      i = this.usuarios.findIndex(user => (user.email === email));  
    } else {
      i = this.usuarios.findIndex(user => (user.email === email && user.senha === senha));
    }
    if (i < 0) {
      return {status:'fail', msg:'Usuário ou senha incorretos'};
    }
    return {status:'ok', msg: `Usuário ${this.usuarios[i].username} logado com sucesso!`, usuario: this.usuarios[i]};
  }

  fazerLogin(email: string, senha:string) {
    let resp = this.findUsuarioByEmail(email, senha);
    if (resp.status === 'fail') {
      return resp;
    }
    this.setLogin(true);
    this.setNomeUsuario(resp.usuario.username);
    this.setUsuario(resp.usuario);
    return resp;
  }

  editUsuario(usuario:Usuario) {
    const i = this.usuarios.findIndex(user => user.email === usuario.email);
    if (i > -1) {
      this.usuarios.splice(i, 1, usuario);
      this.setNomeUsuario(usuario.username);
    }
  }
}
