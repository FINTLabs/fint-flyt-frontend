export interface IAlertContent {
    severity: 'success' | 'announcement' | 'warning' | 'error';
    message: string;
    content?: string;
}