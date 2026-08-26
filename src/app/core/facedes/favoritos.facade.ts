import { Injectable, signal } from "@angular/core";
import { Favoritos } from "../../features/produtos/favoritos/favoritos";
@Injectable({
    providedIn: 'root',
})
export class FavoritosFacade{
    private favoritos = signal<string[]>([]);
    listaFavoritos = this.favoritos.asReadonly();
    meuFavorito(nome: string): boolean {
        return this.favoritos().includes(nome)
    
    }
    alternarFavorito(nome: string): void {
        if (this.meuFavorito(nome)) {
            this.removerFavorito(nome);
        }else{
            this.adicionarFavorito(nome);
        }
    }
    
}