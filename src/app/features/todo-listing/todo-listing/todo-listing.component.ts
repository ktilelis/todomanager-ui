import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs';
import { CreateEditTaskDialog } from '../create-edit-task-dialog/create-edit-task-dialog';
import { TodoItem } from '../models/todo-item-model';
import { TodoManagementService } from '../todo-management.service';

@Component({
    selector: 'tm-todo-listing',
    imports: [MatMiniFabButton, MatIcon, MatDialogModule, CreateEditTaskDialog],
    templateUrl: './todo-listing.component.html',
    styleUrl: './todo-listing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListingComponent {
    protected readonly todoItems: Signal<TodoItem[]>;

    protected readonly dialog = inject(MatDialog);
    private todoManagementService = inject(TodoManagementService);

    constructor() {
        this.todoItems = toSignal(
            this.todoManagementService.getTodos().pipe(map((response) => response.content)),
            {
                initialValue: []
            }
        );
    }

    showAddDialog() {
        this.dialog.open(CreateEditTaskDialog, { data: { isCreate: true } });
    }
}
