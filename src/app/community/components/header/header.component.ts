import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  boards: string[] = [
    'Board 1',
    'Board 2',
    'Board 3',
    'Board 4',
    'Board 5'
  ];
  profiles: string[] = [
    'Profile 1',
    'Profile 2',
    'Profile 3'
  ];
  loggedIn = false;

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
