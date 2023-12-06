import { Routes } from '@angular/router';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { AccommodationPageComponent } from './accommodation/accommodation-page/accommodation-page.component';
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {CreateAccommodationComponent} from "./create-accommodation/create-accommodation.component";

export const routes: Routes = [
    {path: '', component: SearchPageComponent },
    {path: 'home', component: SearchPageComponent },
    {path: 'accommodation/:id', component: AccommodationPageComponent },
    {path: 'view-profile', component: ViewProfileComponent },
    {path: 'edit-profile', component: EditProfileComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'view-profile', component: ViewProfileComponent },
    {path: 'edit-profile', component: EditProfileComponent },
    {path: 'create-accommodation', component: CreateAccommodationComponent },

];
