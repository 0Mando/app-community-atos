import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {

  }

  toggleMenu():void {
    let menu  = document.querySelector('.header')!;
    menu.classList.toggle('active-menu');
  }

  iconToggleMenu():void {
    let menu  = document.querySelector('.header')!;
    menu.classList.remove('active-menu');
  }
}
