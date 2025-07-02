import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CreateOrEditDialogPayload } from '../models/create-edit-dialog-payload';

@Component({
    selector: 'tm-create-edit-task-dialog',
    imports: [MatDialogModule, MatButtonModule, A11yModule, MatFormField, MatInputModule],
    templateUrl: './create-edit-task-dialog.html',
    styleUrl: './create-edit-task-dialog.css',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditTaskDialog {
    data = inject<CreateOrEditDialogPayload>(MAT_DIALOG_DATA);
}
