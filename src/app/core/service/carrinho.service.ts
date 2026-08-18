import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

type ItemCarrinho = {
    nome: string;
    preco: number;
}

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    //!estado Global
    private carrinho = signal<ItemCarrinho[]>([]);
    //? Selectores
    itens = computed(()=> this.carrinho());
    quantidadedeItens = computed(() => this.carrinho().length); //!Quantidade de itens
    totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0));

carrinhoVazio = computed(() => this.carrinho().length === 0);

// TODO: Ações
adicionar(Produto:ItemCarrinho){
    this.carrinho.update(Lista => [...Lista,Produto]);

}
limpar(){
    this.carrinho.set([]);
}
}