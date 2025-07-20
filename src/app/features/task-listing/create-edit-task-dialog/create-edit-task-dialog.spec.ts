import { A11yModule } from '@angular/cdk/a11y';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateOrEditDialogPayload } from '../models/create-edit-dialog-payload';
import { Task } from '../models/task-model';
import { CreateEditTaskDialog } from './create-edit-task-dialog';

describe('CreateEditTaskDialog', () => {
    let component: CreateEditTaskDialog;
    let fixture: ComponentFixture<CreateEditTaskDialog>;
    let dialogRefMock: jest.Mocked<MatDialogRef<CreateEditTaskDialog>>;

    const mockDialogData: CreateOrEditDialogPayload = {
        isCreate: true
    };

    const saveButton = (fixture: ComponentFixture<CreateEditTaskDialog>): HTMLButtonElement =>
        fixture.nativeElement.querySelector('#saveTaskBtn');

    beforeEach(async () => {
        dialogRefMock = {
            close: jest.fn()
        } as any;

        await TestBed.configureTestingModule({
            imports: [
                CreateEditTaskDialog,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatDatepickerModule,
                A11yModule
            ],
            providers: [
                provideNativeDateAdapter(),
                { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
                { provide: MatDialogRef, useValue: dialogRefMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditTaskDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should disable save button when form is invalid', () => {
        expect(component['form'].invalid).toBe(true);
        expect(saveButton(fixture).hasAttribute('disabled')).toBe(true);
    });

    it('should enable save button when form is valid', () => {
        component['form'].patchValue({
            title: 'My Task',
            description: 'Test desc'
        });
        fixture.detectChanges();
        expect(saveButton(fixture).disabled).toBe(false);
    });

    it('should call dialogRef.close with formatted data when save is called', () => {
        const testDate = new Date(2025, 6, 19); // July 19, 2025

        component['form'].patchValue({
            title: 'Title',
            description: 'Desc',
            expiresAt: testDate
        });

        component.save();

        const expected: Task = {
            title: 'Title',
            description: 'Desc',
            expiresAt: new Date(Date.UTC(2025, 6, 19, 23, 59, 59))
        };

        expect(dialogRefMock.close).toHaveBeenCalledWith(expected);
    });

    it('should omit optional fields when not provided', () => {
        component['form'].patchValue({
            title: 'Only title'
        });

        component.save();

        expect(dialogRefMock.close).toHaveBeenCalledWith({
            title: 'Only title',
            description: undefined,
            expiresAt: undefined
        });
    });
});
