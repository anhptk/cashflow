import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public title= '';
  public showBackButton = false;
  public menuExpanded = signal(false);
  public currentLocale = 'en';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {
    this._subscribeToNavigationEnd();
  }

  private _subscribeToNavigationEnd(): void {
    this._router.events
      .pipe(takeUntilDestroyed())
      .subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._setRouteTitle();
        this._setLocale();
      }
    });
  }

  private _setRouteTitle(): void {
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    this.title = route.snapshot.data['title'];
    this.showBackButton = !route.snapshot.data['hideBackButton'];
  }

  private _setLocale(): void {
    this.currentLocale = window.location.pathname.split('/')[1] || 'en';
  }

  public navigateBack(): void {
    this._location.back();
  }

  public toggleMenu(): void {
    this.menuExpanded.set(!this.menuExpanded());
  }

}
