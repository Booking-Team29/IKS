import { Routes } from '@angular/router';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { AccommodationPageComponent } from './accommodation/accommodation-page/accommodation-page.component';
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";

export const routes: Routes = [
    {path: '', component: SearchPageComponent },
    {path: 'home', component: SearchPageComponent },
    {path: 'accommodation/:id', component: AccommodationPageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
