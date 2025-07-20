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
            import('./features/task-listing/task-list/task-list.component').then(
                (c) => c.TaskListComponent
            )
    }
];
