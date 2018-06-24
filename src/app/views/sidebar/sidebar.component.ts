import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

declare const $ : any;
declare interface RouteInfo {
  path : string;
  title : string;
  icon : string;
  class : string;
}
export const ROUTES : RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'pe-7s-graph',
    class: ''
  }, {
    path: 'user',
    title: 'User Profile',
    icon: 'pe-7s-user',
    class: ''
  }, {
    path: 'shareprice',
    title: 'Company Share Price',
    icon: 'pe-7s-culture',
    class: ''
  },
  // { path: 'typography', title: 'Typography',  icon:'pe-7s-news-paper', class:
  // '' }, { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' }, {
  // path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' }, { path:
  // 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' }, {
  // path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class:
  // 'active-pro' },
];

@Component({selector: 'app-sidebar', templateUrl: './sidebar.component.html', styleUrls: ['./sidebar.component.css']})
export class SidebarComponent implements OnInit {
  menuItems : any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logOut() {
    localStorage.setItem("userData", JSON.stringify({isLoggedIn: false}));
    this
      .router
      .navigate(['/join']);
  }
}
