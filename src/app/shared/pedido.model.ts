import { ItemCarrinho } from "./item.carrinho.model";

export class Pedido {
    constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string,
        public itens: Array<ItemCarrinho>
    ){}
}