import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListingComponent } from './todo-listing.component';

describe('TodoListingComponent', () => {
    let component: TodoListingComponent;
    let fixture: ComponentFixture<TodoListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TodoListingComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()]
        }).compileComponents();

        fixture = TestBed.createComponent(TodoListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
