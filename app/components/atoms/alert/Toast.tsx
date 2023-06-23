import React from "react";

type ToastType = "error" | "success" | "warning" | "info";

interface AlertToastProps {
  open: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<AlertToastProps> = ({ open, message, type, onClose }) => {
  if (!open) {
    return null;
  }

  let bgColor;

  switch (type) {
    case "error":
      bgColor = "bg-red-500";
      break;
    case "success":
      bgColor = "bg-green-500";
      break;
    case "warning":
      bgColor = "bg-yellow-500";
      break;
    case "info":
      bgColor = "bg-blue-500";
      break;
    default:
      bgColor = "bg-red-500";
  }

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 text-white p-4 rounded ${bgColor}`}
    >
      <p>{message}</p>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default Toast;
