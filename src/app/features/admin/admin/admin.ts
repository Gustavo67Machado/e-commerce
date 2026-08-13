import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authService = inject(AuthService);
  private router = inject(Router);

  //!Simulação
totalProdutosCadastrados = signal(20);
pedidosPendentes = signal(3);
usuariosCadastrados = signal (8);

usuarioAtual = this.authService.usuarioAtual;

mansagemPerfil = computed(() =>{
  const usuario = this.usuarioAtual();

  if (!usuario){
    return('Nenhum usuario Autenticado!');
  }
  return `Usuario autenticado como: ${usuario.perfil}`;
});

sair(){
  this.authService.logout();
  this.router.navigateByUrl('/login');
  }
}
