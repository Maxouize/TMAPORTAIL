import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public monthNames: string[];

  constructor() {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  /**
   *
   */
  getMonthByDate(date: Date): string {
    return this.monthNames[date.getMonth()];
  }

 }
