import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'pertama', loadChildren: '../tabpertama/tabpertama.module#TabpertamaPageModule'},
      { path: 'kedua', loadChildren: '../menukedua/menukedua.module#MenukeduaPageModule'},
      { path: 'ketiga', loadChildren: '../firebase/firebase.module#FirebasePageModule'},
      { path: 'keempat', loadChildren: '../geolocation/geolocation.module#GeolocationPageModule' }

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
