import { Injectable } from '@angular/core';
import { AppLocale } from '../../constants/locales.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingHelperService {
  private _locale: AppLocale = 'en-US';

  constructor(
    private _router: Router
  ) { }

  public get locale(): AppLocale {
    return this._locale;
  }

  public set locale(locale: AppLocale) {
    this._locale = locale;
  }

  public navigate(url: string): Promise<boolean> {
    const nextUrl = url.includes(this._locale) ? url : `${this._locale}/${url}`;
    return this._router.navigate([nextUrl]);
  }
}
