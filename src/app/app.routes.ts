import { Routes } from '@angular/router';
import { SearchPageComponent } from './home/search-page/search-page.component';

export const routes: Routes = [
    {path: '', component: SearchPageComponent },
    {path: 'home', component: SearchPageComponent },
];
