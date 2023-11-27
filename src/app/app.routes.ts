import { Routes } from '@angular/router';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { AccommodationPageComponent } from './accommodation/accommodation-page/accommodation-page.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export const routes: Routes = [
    {path: '', component: SearchPageComponent },
    {path: 'home', component: SearchPageComponent },
    {path: 'accommodation/:id', component: AccommodationPageComponent },
    {path: 'view-profile', component: ViewProfileComponent },
    {path: 'edit-profile', component: EditProfileComponent },
];
