import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: 'tasks',
        loadComponent: () =>
            import('./features/todo-listing/todo-listing/todo-listing.component').then(
                (c) => c.TodoListingComponent
            )
    }
];
