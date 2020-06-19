import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from 'src/app/shared/service/sidebar.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor() { }
  ngOnInit(): void {
  }

}
