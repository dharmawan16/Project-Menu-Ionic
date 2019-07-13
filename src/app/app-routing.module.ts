import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', loadChildren: './home/home.module#HomePageModule' },
//   { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
//   { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
//   { path: 'tabpertama', loadChildren: './pages/tabpertama/tabpertama.module#TabpertamaPageModule' },
//   { path: 'menukedua', loadChildren: './pages/menukedua/menukedua.module#MenukeduaPageModule' },
//   { path: 'firebase', loadChildren: './pages/firebase/firebase.module#FirebasePageModule' },
//   { path: 'tab2', loadChildren: './pages/tab2/tab2.module#Tab2PageModule' },
//   { path: 'tab3', loadChildren: './pages/tab3/tab3.module#Tab3PageModule' },
//   { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
// ];

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full'}, //path kosong berarti awal page yg di buka, sebagai root
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule'},
  { path: 'tab4', loadChildren: './pages/tab4/tab4.module#Tab4PageModule' },
  { path: 'geolocation', loadChildren: './pages/geolocation/geolocation.module#GeolocationPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
