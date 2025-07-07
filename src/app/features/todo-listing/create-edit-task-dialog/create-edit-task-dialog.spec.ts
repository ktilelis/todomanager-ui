import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateEditTaskDialog } from './create-edit-task-dialog';

describe('CreateEditTaskDialog', () => {
    let component: CreateEditTaskDialog;
    let fixture: ComponentFixture<CreateEditTaskDialog>;

    const mockDialogData = {
        taskId: 123,
        taskName: 'Test Task'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEditTaskDialog],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: mockDialogData }]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditTaskDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
