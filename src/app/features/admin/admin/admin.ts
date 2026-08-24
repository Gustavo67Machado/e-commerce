import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facedes/auth.facade';
import { MatAnchor } from "@angular/material/button";
@Component({
  selector: 'app-admin',
  imports: [MatAnchor],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  //!Simulação
totalProdutosCadastrados = signal(20);
pedidosPendentes = signal(3);
usuariosCadastrados = signal (8);

usuarioAtual = this.authFacade.usuarioAtual;

mansagemPerfil = computed(() =>{
  const usuario = this.usuarioAtual();

  if (!usuario){
    return('Nenhum usuario Autenticado!');
  }
  return `Usuario autenticado como: ${usuario.perfil}`;
});

sair(){
  this.authFacade.sair();
  this.router.navigateByUrl('/login');
  }
}
