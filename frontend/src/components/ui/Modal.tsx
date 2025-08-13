"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/store/modal";
import { Button } from "./Button";

const Modal: React.FC = () => {
  const { isOpen, config, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    title,
    message,
    content,
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
    type = "info",
    size = "md",
    closable = true,
  } = config;

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && closable) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closable, closeModal]);

  // 모달 외부 클릭으로 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closable) {
      closeModal();
    }
  };

  // 확인 버튼 클릭
  const handleConfirm = async () => {
    if (onConfirm) {
      try {
        await onConfirm();
      } catch (error) {
        console.error("Modal confirm error:", error);
      }
    }
    closeModal();
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  };

  // 타입별 아이콘과 색상
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✓",
          iconClass: "text-green-500",
          bgClass: "bg-green-50",
          borderClass: "border-green-200",
        };
      case "warning":
        return {
          icon: "⚠",
          iconClass: "text-yellow-500",
          bgClass: "bg-yellow-50",
          borderClass: "border-yellow-200",
        };
      case "error":
        return {
          icon: "✕",
          iconClass: "text-red-500",
          bgClass: "bg-red-50",
          borderClass: "border-red-200",
        };
      case "confirm":
        return {
          icon: "?",
          iconClass: "text-blue-500",
          bgClass: "bg-blue-50",
          borderClass: "border-blue-200",
        };
      default:
        return {
          icon: "ℹ",
          iconClass: "text-blue-500",
          bgClass: "bg-blue-50",
          borderClass: "border-blue-200",
        };
    }
  };

  // 사이즈별 클래스
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      default:
        return "max-w-md";
    }
  };

  const typeStyles = getTypeStyles();
  const sizeClass = getSizeClass();

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClass} transform rounded-lg bg-white p-6 shadow-xl transition-all duration-200 ease-out`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        {(title || type !== "info") && (
          <div
            className={`mb-4 flex items-center gap-3 rounded-lg p-3 ${typeStyles.bgClass} ${typeStyles.borderClass} border`}
          >
            <div className={`text-2xl font-bold ${typeStyles.iconClass}`}>
              {typeStyles.icon}
            </div>
            {title && (
              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Content */}
        <div className="mb-6">
          {content ? (
            <div className="text-gray-700">{content}</div>
          ) : message ? (
            <p className="text-gray-700">{message}</p>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          {(type === "confirm" || onCancel) && (
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="min-w-[80px]"
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={type === "error" ? "danger" : "primary"}
            onClick={handleConfirm}
            className="min-w-[80px]"
          >
            {confirmText}
          </Button>
        </div>

        {/* Close button */}
        {closable && (
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(modalContent, document.body);
};

export default Modal;
