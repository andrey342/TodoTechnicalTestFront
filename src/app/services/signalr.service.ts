import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

interface PrintItem {
    todoListId: string;
    todoListName: string;
    fileName: string;
    contentType: string;
    fileContent: string; // Base64
}

@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    private hubConnection: signalR.HubConnection | undefined;
    private toastService = inject(ToastService);

    constructor() {
        this.startConnection();
    }

    private startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/print`)
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .then(() => {
                this.toastService.showInfo('Conectado a SignalR para recibir notificaciones');
                this.registerHandlers();
            })
            .catch((err: Error) => {
                console.error('Error while starting connection: ' + err);
                this.toastService.showWarning('Fallo al conectar con el servidor de notificaciones');
            });
    }

    private registerHandlers() {
        this.hubConnection?.on('PrintItems', (data: PrintItem) => {
            this.handlePrintItem(data);
        });
    }

    private handlePrintItem(item: PrintItem) {
        try {
            const byteCharacters = atob(item.fileContent);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: item.contentType });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = item.fileName;
            link.click();
            window.URL.revokeObjectURL(url);

            this.toastService.showSuccess(`Archivo ${item.fileName} descargado automáticamente`);
        } catch (error) {
            console.error('Error processing print item:', error);
            this.toastService.showError('Error al procesar la descarga del archivo');
        }
    }
}