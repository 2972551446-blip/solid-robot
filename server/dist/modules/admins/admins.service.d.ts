export declare class AdminsService {
    findAll(): Promise<any[]>;
    create(openid: string, nickname?: string): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getActiveOpenids(): Promise<any[]>;
}
