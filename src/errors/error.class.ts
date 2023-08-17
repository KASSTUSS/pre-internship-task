type ErrorName = 'NOT_FOUND' | 'UNKNOWN_ERROR';

export class ApiError extends Error {
    name: ErrorName;
    message: string;
    
    constructor ({
        name,
        message,
    }: {
        name: ErrorName,
        message: string,
    }) {
        super();
        this.name = name;
        this.message = message;
    }
} 