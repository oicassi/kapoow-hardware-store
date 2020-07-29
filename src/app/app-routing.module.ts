import { NovoProdutoComponent } from './components/novo-produto/novo-produto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { HomeCategoriaComponent } from './components/home-categoria/home-categoria.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ProdutoComponent } from './components/produto/produto.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'filtrado/:categoria', component: HomeCategoriaComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'novo', component: NovoProdutoComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }