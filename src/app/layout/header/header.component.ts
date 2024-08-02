import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public title= '';
  public showBackButton = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._subscribeToNavigationEnd();
  }

  private _subscribeToNavigationEnd(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._setRouteTitle();
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

  public navigateBack(): void {
    this._location.back();
  }
}
