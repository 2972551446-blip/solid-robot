import { WorksService } from './works.service';
export declare class WorksController {
    private readonly worksService;
    constructor(worksService: WorksService);
    create(body: {
        editor_id: number;
        date: string;
        count: number;
        title: string;
    }): Promise<{
        code: number;
        message: string;
        data: any;
    }>;
    createBatch(body: {
        works: Array<{
            editor_id: number;
            date: string;
            count: number;
            title: string;
        }>;
    }): Promise<{
        code: number;
        message: string;
        data: {
            success: any[];
            failed: {
                editor_id: number;
                error: string;
            }[];
            total: number;
            successCount: number;
            failedCount: number;
        };
    }>;
    findByDate(date: string): Promise<{
        code: number;
        message: string;
        data: any[];
    }>;
    findByDateRange(startDate: string, endDate: string): Promise<{
        code: number;
        message: string;
        data: any[];
    }>;
    findByEditor(editorId: number): Promise<{
        code: number;
        message: string;
        data: any[];
    }>;
    delete(id: string): Promise<{
        code: number;
        message: string;
    }>;
}
