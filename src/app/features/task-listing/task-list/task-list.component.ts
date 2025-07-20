import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { filter, first, map, switchMap } from 'rxjs';
import { CreateEditTaskDialog } from '../create-edit-task-dialog/create-edit-task-dialog';
import { CreateOrEditDialogPayload } from '../models/create-edit-dialog-payload';
import { Task } from '../models/task-model';
import { TaskManagementService } from '../task-management.service';

@Component({
    selector: 'tm-todo-listing',
    imports: [MatMiniFabButton, MatIcon, MatDialogModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
    private todoManagementService = inject(TaskManagementService);
    protected readonly dialog = inject(MatDialog);

    private readonly _items = signal<Task[]>([]);
    protected readonly tasks = this._items.asReadonly();

    constructor() {
        this.todoManagementService
            .getTodos()
            .pipe(
                first(),
                map((response) => response.content)
            )
            .subscribe((tasks) => {
                this._items.set(tasks);
            });
    }

    showAddDialog() {
        const dialogRef = this.dialog.open<CreateEditTaskDialog, CreateOrEditDialogPayload, Task>(
            CreateEditTaskDialog,
            { data: { isCreate: true } }
        );
        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((task): task is Task => !!task),
                switchMap((task) => this.todoManagementService.createTodo(task))
            )
            .subscribe((task) => this._items.update((tasks) => [task, ...tasks]));
    }
}
