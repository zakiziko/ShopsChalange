import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import {ValidationService} from './Services/validation.service';
import {UserService} from './Services/user.service';
import { LoginComponent } from './Components/login/login.component';
import { PrefferedShopComponent } from './Components/preffered-shop/preffered-shop.component';
import {AuthGuard} from './Guards/auth.guard';

const shopRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'preferredShop', component: PrefferedShopComponent, canActivate:[AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    PrefferedShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(shopRoutes),
    NgxPaginationModule,
    FlashMessagesModule
  ],
  providers: [ValidationService,UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
