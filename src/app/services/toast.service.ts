import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: string;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private readonly TOAST_DURATION_MS = 5000;

    toasts = signal<Toast[]>([]);

    showError(message: string) {
        this.addToast(message, 'error');
    }

    showSuccess(message: string) {
        this.addToast(message, 'success');
    }

    showWarning(message: string) {
        this.addToast(message, 'warning');
    }

    showInfo(message: string) {
        this.addToast(message, 'info');
    }

    private addToast(message: string, type: 'error' | 'success' | 'warning' | 'info') {
        const id = crypto.randomUUID();
        const toast: Toast = { id, message, type };

        this.toasts.update(current => [...current, toast]);

        setTimeout(() => this.dismiss(id), this.TOAST_DURATION_MS);
    }

    dismiss(id: string) {
        this.toasts.update(current => current.filter(t => t.id !== id));
    }
}
