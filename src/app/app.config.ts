import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset } from '@primeuix/themes';
import { provideTranslateCompiler, provideTranslateService } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import localeFr from '@angular/common/locales/fr';

import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

const Theme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      primary: {
        50: '{amber.50}',
        100: '{amber.100}',
        200: '{amber.200}',
        300: '{amber.300}',
        400: '{amber.400}',
        500: '{amber.500}',
        600: '{amber.600}',
        700: '{amber.700}',
        800: '{amber.800}',
        900: '{amber.900}',
        950: '{amber.950}',
      },
      surface: {
        0: '#ffffff',
        50: '{amber.50}',
        100: '{amber.100}',
        200: '{amber.200}',
        300: '{amber.300}',
        400: '{amber.400}',
        500: '{amber.500}',
        600: '{amber.600}',
        700: '{amber.700}',
        800: '{amber.800}',
        900: '{amber.900}',
        950: '{amber.950}',
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'fr',
      lang: 'fr',
      compiler: provideTranslateCompiler(TranslateMessageFormatCompiler),
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Theme,
        options: {
          darkModeSelector: false || 'none',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};
