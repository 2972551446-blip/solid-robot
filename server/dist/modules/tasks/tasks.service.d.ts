export declare class TasksService {
    private readonly logger;
    sendReminderNotification(): Promise<void>;
    private sendSubscribeMessage;
    private logSubscription;
    handleOldDataCleanup(): Promise<void>;
}
