// Toast notification types
export interface ToastConfig {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
}

// Toast show function type
export type ShowToast = (config: ToastConfig) => void;