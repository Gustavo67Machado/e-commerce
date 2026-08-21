import { Injectable, PLATFORM_ID } from "@angular/core";
import { signal, computed, effect, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ItemCarrinho } from "../models/item-carrinho";


@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    //!chave de recuperação localstorage
    
    //!estado Global
    private carrinho = signal<ItemCarrinho[]>(this.carregarcarrinhoSalvo());
    //? Selectores
    itens = computed(()=> this.carrinho());
    quantidadedeItens = computed(() => this.carrinho().length); //!Quantidade de itens
    totalItens = computed(() =>
        this.carrinho().reduce((total, item) => total + item.preco,0));
    
    carrinhoVazio = computed(() => this.carrinho().length === 0);
    
    //! ========= PERSISTENCIA CARRINHO
    private plataformId = inject(PLATFORM_ID);
    private readonly chaveStorage = 'carrinho-storage';

constructor(){
    effect(() =>{
        this.salvarCarrinho(this.carrinho());
    });
}
private estarNoNavegador(): boolean{
return isPlatformBrowser(this.plataformId);
}
private carregarcarrinhoSalvo(): ItemCarrinho []{
    if(!this.estarNoNavegador()){
        return[];
    }
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if(!dadosSalvos){
        return[];
    }

    try {
        return JSON.parse(dadosSalvos) as ItemCarrinho[];
    }catch{
        return[];
    }
}

private salvarCarrinho (item: ItemCarrinho[]){
    if(!this.estarNoNavegador()){
        return;
    }
localStorage.setItem(this.chaveStorage, JSON.stringify(item));    
}

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