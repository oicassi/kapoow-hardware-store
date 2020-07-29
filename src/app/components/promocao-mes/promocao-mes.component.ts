import { DummyDataService } from './../../services/dummy-data.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-promocao-mes',
  templateUrl: './promocao-mes.component.html',
  styleUrls: ['./promocao-mes.component.css']
})
export class PromocaoMesComponent implements OnInit {
  
  public slides: any[] = []
  public listaProdutos: any[] = []
  @Input() nomeDaPromocao: string;
  @Input() icon: string;

  constructor(private _dmyServ: DummyDataService) {
    this.listaProdutos = this._dmyServ.getListaProdutos();
  }

  ngOnInit(): void {
    this.setSlidesCarrossel();
  }

  /**
   * Montar o array de arrays slides com base nos produtos do dummy data service
   */
  setSlidesCarrossel() {
    for (let i = 0; i < 3; i++) {
      let tempArray = [];
      for (let j = 0; j < 3; j++) {
        tempArray.push(this.listaProdutos[i * 3 + j])
      }
      this.slides.push({produtos: tempArray});
    }
  }

}
