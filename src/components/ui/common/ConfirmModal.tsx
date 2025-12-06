// import libraries
import {useState} from "react";

// import components
import {Button} from "@/components/ui/common/Button";

// import icons
import {Trash, LogOut, Check} from "lucide-react";

interface ConfirmModalProps {
  type?: "delete" | "logout" | "confirm";
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  type = "delete",
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-2 border-gray-200"
        onClick={handlePropagation}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            {type === "delete" ? (
              <Trash className="w-8 h-8 text-gray-900" />
            ) : type === "logout" ? (
              <LogOut className="w-8 h-8 text-gray-900" />
            ) : type === "confirm" ? (
              <Check className="w-8 h-8 text-gray-900" />
            ) : null}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-base text-gray-600 mt-3 text-center leading-relaxed">
            {message}
          </p>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={async () => {
              setIsLoading(true);
              await onConfirm();
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
