import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

export const routes: Routes = [
    { path: 'events/detail/:id', component: EventDetailComponent},
    { path: 'events', component: EventListComponent},
    { path: '',   redirectTo: '/events', pathMatch: 'full' }
];
