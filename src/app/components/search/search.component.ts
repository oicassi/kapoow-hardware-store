import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  inputSearch: string;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _navServ: NavigationService
  ) { }

  ngOnInit(): void {
  }

  filtrarConteudo() {
    let plup = this.inputSearch;
    // Esse setTimeout é uma gambiarra diabólica mds do cey
    setTimeout(() => {
      this.inputSearch = '';
    }, 50)
    this._router.navigate(['filtrado', plup]);
  }

}
