import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';


import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/oferta.model'



@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) //executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() //preveni que ocorra duas pesquisas idênticas
      .switchMap((termoDaBusca: string) => {
        if (termoDaBusca.trim() === '') {
          //retornar um observable de array de ofertas vazio caso preencha um campo vazio na pesquisa
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termoDaBusca)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })
  }
  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }
  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
