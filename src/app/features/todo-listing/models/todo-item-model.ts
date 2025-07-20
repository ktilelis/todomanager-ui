export interface TodoItem {
    id?: number;
    title: string;
    description?: string;
    expiresAt?: Date;
    isDone?: boolean;
}
