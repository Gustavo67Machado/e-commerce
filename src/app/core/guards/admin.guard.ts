import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthFacade } from "../facedes/auth.facade";
export const adimnGuard: CanActivateFn = () => {

    const router = inject(Router);
    const authFacade = inject(AuthFacade)

//! - 1) Verifecar se o usuario esta logado
if(!authFacade.usuarioLogado()){
    return router.createUrlTree(['/acesso-negado']);
    }
    //! - 2) Verificar se o usuario atual (Logado), se tem perfil adm
    if(!authFacade.admin()){
        return router.createUrlTree(['/acesso-negado'])
    }
    //! - 3) se o usuario estiver logado e for adm = ACESSO LIBERADO
    return true;
}