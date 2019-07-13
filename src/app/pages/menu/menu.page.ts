import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages=[
    { title: 'Menu dengan Tab', url: '/menu/pertama'},
    { title: 'Menu Kedua', url: '/menu/kedua'},
    { title: 'Firebase', url: '/menu/ketiga'},
    { title: 'Geolocation', url: '/menu/keempat'}
  ];

  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) =>{
      if (event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}
