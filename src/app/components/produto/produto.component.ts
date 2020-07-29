import { NavigationService } from './../../services/navigation.service';
import { DummyDataService } from './../../services/dummy-data.service';
import { Component, OnInit } from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: any = {};
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private _dmyServ: DummyDataService,
    private _navServ: NavigationService
  ) {
    this.produto = this._dmyServ.getProdutoSelecionado();
    this._navServ.setShowSideNav('categories');
  }

  ngOnInit(): void {
    this.setGalleryOptions();
    this.setGalleryImages();
  }

  setGalleryOptions() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '100%',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  setGalleryImages() {
    this.produto.imgs.forEach(img => {
      const imagem = {
        small: img,
        medium: img,
        big: img
      }
      this.galleryImages.push(imagem);
    })
  }

  getEstrelasPreenchidas() {
    return Array(5);
  }

}
