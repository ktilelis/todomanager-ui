import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PagedResponse } from '@shared/models';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Task } from './models/task-model';

@Injectable({
    providedIn: 'root'
})
export class TaskManagementService {
    private httpClient = inject(HttpClient);
    private readonly TODO_URL = `${environment.baseURL}/todo`;

    getTodos() {
        return this.httpClient.get<PagedResponse<Task>>(this.TODO_URL);
    }

    createTodo(task: Task): Observable<Task> {
        return this.httpClient.post<Task>(this.TODO_URL, task);
    }
}
