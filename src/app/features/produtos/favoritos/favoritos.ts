import { Component } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {
  favoritos: any[] = [];

  ngOnInit() {
    this.favoritos = JSON.parse(
      localStorage.getItem('favoritos') || '[]'
    );
  }

  removerFavorito(id: number) {
    this.favoritos = this.favoritos.filter(
      produto => produto.id !== id
    );

    localStorage.setItem(
      'favoritos',
      JSON.stringify(this.favoritos)
    );
  }
  
}

