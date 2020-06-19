import { Component, OnInit, HostListener } from '@angular/core';
import { SidebarService } from 'src/app/shared/service/sidebar.service';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['./full.scss']
})
export class FullComponent implements OnInit {

  title = 'angular-pro-sidebar';

  // constructor(public sidebarservice: SidebarService) { }

  // ngOnInit() { }

  // toggleSidebar() {
  //   this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  // }
  // toggleBackgroundImage() {
  //   this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  // }
  // getSideBarState() {
  //   return this.sidebarservice.getSidebarState();
  // }

  // hideSidebar() {
  //   this.sidebarservice.setSidebarState(true);
  // }

  public config: PerfectScrollbarConfigInterface = {};

  constructor() { }

  public innerWidth: any;
  public defaultSidebar: any;
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'mini-sidebar';

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/starter']);
    // }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }


}
