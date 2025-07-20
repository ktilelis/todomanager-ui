import { provideHttpClient } from '@angular/common/http';
import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import { MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({
            eventCoalescing: true
        }),
        provideRouter(routes),
        provideHttpClient(),
        provideNativeDateAdapter(CUSTOM_DATE_FORMATS), // CUSTOM_DATE_FORMATS config is ignored because of https://github.com/angular/components/issues/31107
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        }
    ]
};
