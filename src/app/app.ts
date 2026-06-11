import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import translationsFR from '../../public/i18n/fr.json';
import { BottomBar } from './common/bottom-bar/bottom-bar/bottom-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pourliche');
  private translate = inject(TranslateService);

  constructor(private primeng: PrimeNG) {
    this.translate.setTranslation('fr', translationsFR);
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
