import { EditorsService } from './editors.service';
export declare class EditorsController {
    private readonly editorsService;
    constructor(editorsService: EditorsService);
    findAll(): Promise<{
        code: number;
        message: string;
        data: any[];
    }>;
    create(body: {
        name: string;
        price: string;
        default_count?: number;
    }): Promise<{
        code: number;
        message: string;
        data: any;
    }>;
    update(id: number, body: {
        name?: string;
        price?: string;
        default_count?: number;
        is_active?: boolean;
    }): Promise<{
        code: number;
        message: string;
        data: any;
    }>;
    delete(id: number): Promise<{
        code: number;
        message: string;
        data: {
            message: string;
        };
    }>;
}
