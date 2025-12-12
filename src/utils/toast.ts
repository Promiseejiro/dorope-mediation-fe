// utils/toast.ts
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default toast configuration
const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
};

// Success toast
export const toastSuccess = (message: string, options?: Partial<ToastOptions>) => {
    toast.success(message, {
        ...defaultOptions,
        ...options,
    });
};

export const toastError = (message: string, options?: Partial<ToastOptions>) => {
    toast.error(message, {
        ...defaultOptions,
        ...options,
    });
};

export const toastWarning = (message: string, options?: Partial<ToastOptions>) => {
    toast.warn(message, {
        ...defaultOptions,
        ...options,
    });
};

export const toastInfo = (message: string, options?: Partial<ToastOptions>) => {
    toast.info(message, {
        ...defaultOptions,
        ...options,
    });
};

export const toastCustom = (
    message: string | React.ReactNode,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    options?: Partial<ToastOptions>
) => {
    const config = {
        ...defaultOptions,
        ...options,
    };

    switch (type) {
        case 'success':
            return toast.success(message, config);
        case 'error':
            return toast.error(message, config);
        case 'warning':
            return toast.warn(message, config);
        case 'info':
        default:
            return toast.info(message, config);
    }
};

export const dismissAllToasts = () => {
    toast.dismiss();
};

export const dismissToast = (toastId: string | number) => {
    toast.dismiss(toastId);
};

export const updateToast = (
    toastId: string | number,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    options?: Partial<ToastOptions>
) => {
    toast.update(toastId, {
        render: message,
        type,
        ...defaultOptions,
        ...options,
        isLoading: false,
    });
};

export type ToastPosition =
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';

export const createToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    position: ToastPosition = 'top-right',
    autoClose: number = 5000
) => {
    const config: ToastOptions = {
        position,
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    };

    switch (type) {
        case 'success':
            return toast.success(message, config);
        case 'error':
            return toast.error(message, config);
        case 'warning':
            return toast.warn(message, config);
        case 'info':
        default:
            return toast.info(message, config);
    }
};

export const toastLoading = (message: string, toastId?: string) => {
    return toast.loading(message, {
        ...defaultOptions,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastId,
    });
};

export const updateLoadingToast = (
    toastId: string | number,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    autoClose: number = 3000
) => {
    toast.update(toastId, {
        render: message,
        type,
        isLoading: false,
        autoClose,
        closeOnClick: true,
        draggable: true,
    });
};