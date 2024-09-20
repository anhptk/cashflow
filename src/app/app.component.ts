import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RoutingHelperService } from './shared/services/utils/routing-helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private _router: Router,
    private _routingHelper: RoutingHelperService
  ) {}

  ngOnInit() {
    this._subscribeToNavigationEvents();
  }

  private _subscribeToNavigationEvents() {
    this._router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart && !event.url.includes(this._routingHelper.locale)) {
          this._routingHelper.navigate(event.url);
        }
      }
    );
  }
}
