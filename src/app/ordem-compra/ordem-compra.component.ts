import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Pedido } from '../shared/pedido.model'

import {CarrinhoService} from '../carrinho.service'
import {ItemCarrinho} from '../shared/item.carrinho.model'
@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  
  public itensCarrinho: ItemCarrinho[] = []
  
  /* FormControl aceita 3 parâmetros opcionais:
  1 - Valor inicial do campo
  2 - Array de validadores
  3 - Array de validadores assíncronos
  */
  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, Validators.required)
  })

  public idPedidoCompra: number
  
  constructor(
    private ordemCompraService:OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }
  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.itensCarrinho)
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID'){
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    } else {
      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item')
      } else {
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
          )
          console.log(pedido)
        
          this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho()
          })
         
      }
    }
  }

  public adicionar(item:ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }
  public diminuir(item:ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }
}
