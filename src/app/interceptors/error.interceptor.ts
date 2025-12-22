import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, from, of, switchMap } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ApiException } from '../api/api-client';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toastService = inject(ToastService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const handleErrorMessage = (msg: string) => {
                toastService.showError(msg);
                return throwError(() => error);
            };
            let message = 'Ha ocurrido un error inesperado';

            // If the error is a Blob
            if (error.error instanceof Blob) {
                return from(error.error.text()).pipe(
                    switchMap(text => {
                        if (text) {
                            try {
                                const errorObj = JSON.parse(text);
                                message = errorObj.detail || errorObj.message || errorObj.title || message;
                            } catch {
                                // If not JSON, use the first 200 chars of text if it looks like a message
                                if (text.length < 200) message = text;
                            }
                        }
                        return handleErrorMessage(message);
                    })
                );
            }

            if (ApiException.isApiException(error.error)) {
                message = error.error.message || message;
            } else if (error.error instanceof ErrorEvent) {
                // Client-side error
                message = error.error.message;
            } else if (typeof error.error === 'string') {
                message = error.error;
            } else if (error.message) {
                message = error.message;
            }

            return handleErrorMessage(message);
        })
    );
};