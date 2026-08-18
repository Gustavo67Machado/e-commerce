import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";
import { ItemCarrinho } from "../models/item-carrinho";


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

removerItens(rmvItem:number){
    this.carrinho.update((listaAtual) =>
    listaAtual.filter((_, index) => index !== rmvItem));
    
    }
}