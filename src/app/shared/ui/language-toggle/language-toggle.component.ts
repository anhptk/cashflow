import { Component } from '@angular/core';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [],
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.scss'
})
export class LanguageToggleComponent {
  public getCurrentLocale(): string {
    return window.location.pathname.split('/')[1] || 'en';
  }

  public toggleLanguage() {
    const currentLocale = this.getCurrentLocale();
    const targetLocale = currentLocale === 'en' ? 'vi' : 'en';
    window.location.href = `/${targetLocale}/`;
  }
}
