import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskDialog } from './create-edit-task-dialog';

describe('CreateEditTaskDialog', () => {
    let component: CreateEditTaskDialog;
    let fixture: ComponentFixture<CreateEditTaskDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEditTaskDialog]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditTaskDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
