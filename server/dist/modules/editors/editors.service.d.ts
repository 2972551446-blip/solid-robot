export declare class EditorsService {
    findAll(): Promise<any[]>;
    create(name: string, price: string, default_count?: number): Promise<any>;
    update(id: number, updates: {
        name?: string;
        price?: string;
        default_count?: number;
        is_active?: boolean;
    }): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
