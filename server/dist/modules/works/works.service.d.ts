interface WorkInput {
    editor_id: number;
    date: string;
    count: number;
    title: string;
}
interface BatchResult {
    success: any[];
    failed: Array<{
        editor_id: number;
        error: string;
    }>;
    total: number;
    successCount: number;
    failedCount: number;
}
export declare class WorksService {
    create(editor_id: number, date: string, count: number, title: string): Promise<any>;
    createBatch(inputs: WorkInput[]): Promise<BatchResult>;
    private createSingle;
    findByDate(date: string): Promise<any[]>;
    findByDateRange(startDate: string, endDate: string): Promise<any[]>;
    findByEditor(editorId: number): Promise<any[]>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
export {};
