import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/service/sidebar.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  // menus = [];

  // constructor(public sidebarservice: SidebarService) {
  //   this.menus = sidebarservice.getMenuList();
  // }

  // ngOnInit() {
  // }

  // getSideBarState() {
  //   return this.sidebarservice.getSidebarState();
  // }

  // toggle(currentMenu) {
  //   if (currentMenu.type === 'dropdown') {
  //     this.menus.forEach(element => {
  //       if (element === currentMenu) {
  //         currentMenu.active = !currentMenu.active;
  //       } else {
  //         element.active = false;
  //       }
  //     });
  //   }
  // }

  // getState(currentMenu) {

  //   if (currentMenu.active) {
  //     return 'down';
  //   } else {
  //     return 'up';
  //   }
  // }

  // hasBackgroundImage() {
  //   return this.sidebarservice.hasBackgroundImage;
  // }

}
