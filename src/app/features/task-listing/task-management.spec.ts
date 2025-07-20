import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { TaskManagementService } from './task-management.service';
import { provideHttpClient } from '@angular/common/http';
import { PagedResponse } from '@shared/models';
import { Task } from './models/task-model';

describe('TaskManagementService', () => {
    let service: TaskManagementService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting(), TaskManagementService]
        });

        service = TestBed.inject(TaskManagementService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no outstanding requests
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET and return todos', () => {
        const mockResponse: PagedResponse<Task> = {
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
