import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'search/:type', component: SearchComponent},
  { path : 'search', component : SearchComponent},
  { path : 'view/:id', component : ViewComponent},
  { path : 'login', component : LoginComponent},
  { path : 'add', component : AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
