import { Task } from './task-model';

export interface CreateOrEditDialogPayload {
    task?: Task;
    isCreate: boolean;
}
