import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form', loadChildren: () => import('./modules/form/form.module').then(m => m.FormModule)}
];
