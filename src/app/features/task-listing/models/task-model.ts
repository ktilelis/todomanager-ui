export interface Task {
    id?: number;
    title: string;
    description?: string;
    expiresAt?: Date;
    isDone?: boolean;
}
