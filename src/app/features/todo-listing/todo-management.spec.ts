import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { TodoManagementService } from './todo-management.service';
import { provideHttpClient } from '@angular/common/http';
import { PagedResponse } from '@shared/models';
import { TodoItem } from './models/todo-item-model';

describe('TodoManagementService', () => {
    let service: TodoManagementService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting(), TodoManagementService]
        });

        service = TestBed.inject(TodoManagementService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no outstanding requests
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET and return todos', () => {
        const mockResponse: PagedResponse<TodoItem> = {
            content: [{ id: 1, title: 'Test Todo', description: 'description' }],
            page: {
                size: 20,
                number: 1,
                totalElements: 1,
                totalPages: 1
            }
        };

        service.getTodos().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.baseURL}/todo`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
