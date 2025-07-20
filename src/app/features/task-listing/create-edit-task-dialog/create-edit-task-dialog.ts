import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CreateOrEditDialogPayload } from '../models/create-edit-dialog-payload';
import { Task } from '../models/task-model';

type TaskForm = {
    title: FormControl<string>;
    description?: FormControl<string | null>;
    expiresAt?: FormControl<Date | null>;
};

@Component({
    selector: 'tm-create-edit-task-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule,
        A11yModule,
        MatFormField,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule
    ],
    templateUrl: './create-edit-task-dialog.html',
    styleUrl: './create-edit-task-dialog.css',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditTaskDialog {
    data = inject<CreateOrEditDialogPayload>(MAT_DIALOG_DATA);

    private fb = inject(FormBuilder);
    private dialogRef = inject<MatDialogRef<CreateEditTaskDialog, Task>>(MatDialogRef);

    protected form = this.fb.group<TaskForm>({
        title: this.fb.nonNullable.control('', {
            validators: [Validators.required, Validators.max(100)]
        }),
        description: this.fb.control(null, Validators.max(500)),
        expiresAt: this.fb.control(null)
    });

    save() {
        const extractDate = (date: Date) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            return new Date(Date.UTC(year, month, day, 23, 59, 59));
        };

        const formValue = this.form.getRawValue();
        const result = {
            ...formValue,
            description: formValue.description ?? undefined,
            expiresAt: formValue.expiresAt ? extractDate(formValue.expiresAt) : undefined
        } as Task;

        this.dialogRef.close(result);
    }
}
