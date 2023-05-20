import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core'; //Locale_ID, trabalhar com moedas
import { HttpModule } from '@angular/http' //requisição http
import { RouterModule } from '@angular/router' //rotas
// import { FormsModule } from '@angular/forms' //validar formularios
import { ReactiveFormsModule } from "@angular/forms"; //Substituto de FormsModule
import { ROUTES } from './app.routes' //rotas


import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';

import {CarrinhoService} from './carrinho.service'
//pipe
import { DescricaoReduzida } from './util/descricao-reduzida.pipe';




@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ CarrinhoService,{ provide: LOCALE_ID, useValue: 'pt-Br' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
