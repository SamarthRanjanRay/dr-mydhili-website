import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    LoginComponent,
    ViewComponent,
    AddComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
