import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getOpenid(body: {
        code: string;
    }): Promise<{
        code: number;
        message: string;
        data: {
            openid: string;
            session_key: string;
            unionid: null;
        };
    }>;
}
