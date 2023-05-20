import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.services'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''
  constructor(
    private route: ActivatedRoute, 
    private ofertaServices: OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertaServices.getComoUsarOfertaPorId(parametros.id)
      .then((descricao: string) => {
        this.comoUsar = descricao
      })

    })
  }

}
