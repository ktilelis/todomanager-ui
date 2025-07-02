import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PagedResponse } from '@shared/models';

import { environment } from '../../../environments/environment';
import { TodoItem } from './models/todo-item-model';

@Injectable({
    providedIn: 'root'
})
export class TodoManagementService {
    private httpClient = inject(HttpClient);
    private readonly TODO_URL = `${environment.baseURL}/todo`;

    constructor() {}

    getTodos() {
        return this.httpClient.get<PagedResponse<TodoItem>>(this.TODO_URL);
    }
}
