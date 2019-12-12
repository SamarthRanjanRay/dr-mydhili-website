import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOneComponent } from './view-one/view-one.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: 'search/:para', component: SearchComponent},
  { path: 'view/:id', component: ViewOneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
