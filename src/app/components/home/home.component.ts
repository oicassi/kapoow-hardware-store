import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promocoes = [
    {nomeDaPromocao: 'Super Julho EXPLOSIVO - Promoções destruidoras', icon:'campaign'},
    {nomeDaPromocao: 'Ofertas BOMBANDO - Os mais bem avaliados', icon:'star'},
    {nomeDaPromocao: 'Corra antes que acabe - Os mais vendidos', icon:'directions_run'}

  ]

  constructor(
    private _navServ: NavigationService
  ) {
    this._navServ.setShowSideNav('categories')
  }

  ngOnInit(): void {
  }

}
