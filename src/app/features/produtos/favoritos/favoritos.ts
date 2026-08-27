import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoritosFacade } from '../../../core/facedes/favoritos.facade';
import { MatAnchor } from "@angular/material/button";
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-favoritos',
  imports: [FormsModule, MatAnchor, MatButton, MatButtonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  favoritosFacade = inject(FavoritosFacade);
  novoProduto = '';

  
  adicionarProduto(): void {
    this.favoritosFacade.adicionarFavorito(this.novoProduto);
    this.novoProduto = '';
  }

  removerProduto(produto: string): void {
    this.favoritosFacade.removerFavorito(produto);
  }
}

