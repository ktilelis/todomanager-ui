import { TodoItem } from './todo-item-model';

export interface CreateOrEditDialogPayload {
    task?: TodoItem;
    isCreate: boolean;
}
