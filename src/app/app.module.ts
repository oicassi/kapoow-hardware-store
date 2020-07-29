import { HomeCategoriaComponent } from './components/home-categoria/home-categoria.component';
import { PromocaoMesComponent } from './components/promocao-mes/promocao-mes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesMenuComponent } from './components/categories-menu/categories-menu.component';
import { SearchComponent } from './components/search/search.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CardProdutoComponent } from './components/card-produto/card-produto.component';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CardResumoComponent } from './components/card-resumo/card-resumo.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CardCarrinhoComponent } from './components/card-carrinho/card-carrinho.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckoutComponent } from './components/checkout/checkout.component'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio';
import { CardFinalizaComponent } from './components/card-finaliza/card-finaliza.component';
import { ContatoComponent } from './components/contato/contato.component';
import { ContatoSideComponent } from './components/contato-side/contato-side.component'; 
import { TextFieldModule } from '@angular/cdk/text-field';
import { SobreSideComponent } from './components/sobre-side/sobre-side.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ClienteSideComponent } from './components/cliente-side/cliente-side.component';
import { ClienteComponent } from './components/cliente/cliente.component'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatTableModule } from '@angular/material/table';
import { NovoProdutoComponent } from './components/novo-produto/novo-produto.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesMenuComponent,
    SearchComponent,
    PromocaoMesComponent,
    CardProdutoComponent,
    LoginComponent,
    HomeComponent,
    HomeCategoriaComponent,
    CardResumoComponent,
    ProdutoComponent,
    CardCarrinhoComponent,
    CarrinhoComponent,
    CheckoutComponent,
    CardFinalizaComponent,
    ContatoComponent,
    ContatoSideComponent,
    SobreSideComponent,
    SobreComponent,
    ClienteSideComponent,
    ClienteComponent,
    NovoProdutoComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    MatBadgeModule,
    NgxGalleryModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    TextFieldModule,
    MatTabsModule,
    MatTableModule

  ],
  entryComponents: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
