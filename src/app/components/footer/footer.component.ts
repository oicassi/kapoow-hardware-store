import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public institucional = ['Quem somos', 'Trabalhe conosco', 'Políticas do site', 'Políticas de privacidade'];
  public duvidas = ['FAQ', 'Como comprar', 'Formas de pagamento'];
  public canais = [ 'Fone: (41)3456-1234', 'E-mail: atendimento@kapoow.com', 'Formulário de atendimento', 'Chat'];
  public seguranca = ['Google site seguro', 'Ótimo - ReclameAqui', '9.9 Ótimo - Compre e confie'];

  constructor() { }

  ngOnInit(): void {
  }

}
