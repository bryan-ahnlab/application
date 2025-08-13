import { create } from "zustand";

export interface ModalConfig {
  title?: string;
  message?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  type?: "info" | "success" | "warning" | "error" | "confirm";
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
}

interface ModalState {
  isOpen: boolean;
  config: ModalConfig;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  updateConfig: (config: Partial<ModalConfig>) => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  config: {
    title: "",
    message: "",
    content: null,
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => {},
    type: "info",
    size: "md",
    closable: true,
  },

  openModal: (config: ModalConfig) => {
    set({
      isOpen: true,
      config: {
        ...get().config,
        ...config,
      },
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
    });
  },

  updateConfig: (config: Partial<ModalConfig>) => {
    set((state) => ({
      config: {
        ...state.config,
        ...config,
      },
    }));
  },
}));

// 편의 함수들
export const modal = {
  info: (config: Omit<ModalConfig, "type">) =>
    useModalStore.getState().openModal({ ...config, type: "info" }),

  success: (config: Omit<ModalConfig, "type">) =>
    useModalStore.getState().openModal({ ...config, type: "success" }),

  warning: (config: Omit<ModalConfig, "type">) =>
    useModalStore.getState().openModal({ ...config, type: "warning" }),

  error: (config: Omit<ModalConfig, "type">) =>
    useModalStore.getState().openModal({ ...config, type: "error" }),

  confirm: (config: Omit<ModalConfig, "type">) =>
    useModalStore.getState().openModal({ ...config, type: "confirm" }),

  close: () => useModalStore.getState().closeModal(),
};
