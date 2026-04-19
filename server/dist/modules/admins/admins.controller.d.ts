import { AdminsService } from './admins.service';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    findAll(): Promise<{
        code: number;
        message: string;
        data: any[];
    }>;
    create(body: {
        openid: string;
        nickname?: string;
    }): Promise<{
        code: number;
        message: string;
        data: any;
    }>;
    delete(id: string): Promise<{
        code: number;
        message: string;
    }>;
}
