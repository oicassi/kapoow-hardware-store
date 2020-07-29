import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var ol: any;
@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {


  private platform: any;

  @ViewChild("map")
  public mapElement: ElementRef;


  latitude: number = -25.426432;
  longitude: number = -49.262446;
  map: any;


  sobre = `A KaPoow Hardware Store é uma empresa paranaense fundada em 2005 em Curitiba e que sempre buscou estar além das expectativas 
    e a frente de seu tempo, trazendo para os seus clientes os últimos lançamentos do universo da informática, criando parcerias 
    fortes e entregando extrema qualidade e preço baixo, além de oferecer a exclusiva entrega turbinada para que os clientes possam estar sempre 
    conectados o mais rapidamente possível com o que há de melhor em tecnologia.`;

  sobreFim = `Venha nos fazer uma visita em uma de nossas 344 lojas e tomar um café conosco e experimentar as máquinas da próxima geração. 
    Estamos esperando ;D`;

  constructor(
    private _navServ: NavigationService
  ) {
    this._navServ.setShowSideNav('sobreSide');

  }

  ngOnInit(): void {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 18
      })
    });
    this.addPoint(this.latitude, this.longitude);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/extra/pin.png",
          scale: 0.03
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }
}
