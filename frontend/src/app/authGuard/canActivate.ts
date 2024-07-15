import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../services/token.service";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ) => {
        const token = new TokenService().getToken()
        if(token !== null)
            return false
        return true
    }