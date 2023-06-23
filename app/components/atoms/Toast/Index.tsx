import "./Toast.scss"; // CSSファイルをインポート

import React, { useEffect, useState } from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

type ToastType = "error" | "success" | "warning" | "info";

interface AlertToastProps {
  open: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
}

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
      Icon = ExclamationCircleIcon;
      break;
    case "success":
      bgColor = "bg-green-500";
      Icon = CheckCircleIcon;
      break;
    case "warning":
      bgColor = "bg-yellow-500";
      Icon = ExclamationTriangleIcon;
      break;
    case "info":
      bgColor = "bg-blue-500";
      Icon = InformationCircleIcon;
      break;
    default:
      bgColor = "bg-red-500";
      Icon = ExclamationCircleIcon;
  }

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 text-white p-4 rounded ${bgColor} toast`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
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
