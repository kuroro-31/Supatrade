import "./Toast.scss"; // CSSファイルをインポート

import React, { useEffect, useState } from "react";

type ToastType = "error" | "success" | "warning" | "info";

interface AlertToastProps {
  open: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
}

// Error Icon (Exclamation Circle)
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-12a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14z"
    />
  </svg>
);

// Success Icon (Check Circle)
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Warning Icon (Exclamation)
const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

// Info Icon (Information Circle)
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v1m0 4a1 1 0 01-1-1v-2a1 1 0 011-1m-1 10a9 9 0 110-18 9 9 0 010 18zm0-2a7 7 0 100-14 7 7 0 000 14z"
    />
  </svg>
);

const Toast: React.FC<AlertToastProps> = ({ open, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000); // 3秒後にトーストを非表示にする
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!isVisible) {
    return null;
  }

  let bgColor;
  let Icon;

  switch (type) {
    case "error":
      bgColor = "bg-red-500";
      Icon = ErrorIcon;
      break;
    case "success":
      bgColor = "bg-green-500";
      Icon = SuccessIcon;
      break;
    case "warning":
      bgColor = "bg-yellow-500";
      Icon = WarningIcon;
      break;
    case "info":
      bgColor = "bg-blue-500";
      Icon = InfoIcon;
      break;
  }

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 text-white p-4 rounded ${bgColor} toast`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon />
          <div className="progress-ring"></div>
        </div>
        <div className="ml-3">
          <p>{message}</p>
        </div>
      </div>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default Toast;
