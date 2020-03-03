import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  active: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home', icon: '',  active: true},
    { path: '/client-view', title: 'Vue client', icon: '', active: false },
    { path: '/dev-view', title: 'Vue développeur', icon: '',  active: false},
    { path: '/manager-view', title: 'Vue manager', icon: '',  active: false},
  ];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public routeLinks: RouteInfo[];
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public toggleNavbar: boolean;
  public context: string;

  constructor(private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef) {
    this.toggleNavbar = false;
    this.mobileQuery = media.matchMedia('(max-width: 940px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.routeLinks = [...ROUTES];
    this.context = this.getPathLocation();
    this.routeLinks.forEach((route) => {
      route.active = route.path ===  '/' + this.context ? true : false;
    });
  }

  toggleNavBar(indexRoute: number) {
    if (this.mobileQuery.matches) {
      this.toggleNavbar = !this.toggleNavbar;
    }
    this.routeLinks.forEach((route) => {
      route.active = false;
    });
    this.routeLinks[indexRoute].active = true;
  }

  getPathLocation() {
    const contextList = window.location.pathname.split('/');

    return contextList[contextList.length - 1];
  }
}
