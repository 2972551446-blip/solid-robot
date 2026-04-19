export declare class AuthService {
    getOpenidByCode(code: string): Promise<{
        openid: string;
        session_key: string;
        unionid: null;
    }>;
}
