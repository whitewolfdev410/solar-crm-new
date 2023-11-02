import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

@Injectable()
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) private matDateLocale: string, private platform: Platform) {
    super(matDateLocale, platform);
  }

  getFirstDayOfWeek(): number {
   // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
   return 1;
  }

}