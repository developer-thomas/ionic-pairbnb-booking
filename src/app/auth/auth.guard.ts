import { Injectable } from "@angular/core";
import { CanLoad, CanMatch, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canMatch(
    route: Route, 
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.userIsAuthenticated) {
      return this.router.navigate(['/auth']);
    }
    return true;
  }
}