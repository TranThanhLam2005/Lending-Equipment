// import libraries
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

// import types
import type {LendingModalProps, LendingModalInfoRowProps} from "@/types/Type";

// import components
import {Button} from "@/components/ui/common/Button";

// import icons
import {
  ClipboardList,
  User,
  UserCheck,
  Package,
  Calendar,
  FileText,
  X,
} from "lucide-react";

/**
 * Prevent event propagation helper
 */
const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

/**
 * LendingModal Component
 * Modal for requesting equipment lending with purpose input
 */
const LendingModal = ({title, data, onAccept, onCancel}: LendingModalProps) => {
  const [purpose, setPurpose] = useState("");

  /**
   * InfoRow Component - Displays a labeled information row with icon
   */
  const InfoRow = ({icon: Icon, label, value}: LendingModalInfoRowProps) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{scale: 0.9, opacity: 0, y: 20}}
          animate={{scale: 1, opacity: 1, y: 0}}
          exit={{scale: 0.9, opacity: 0, y: 20}}
          transition={{type: "spring", duration: 0.5}}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={stopPropagation}
        >
          {/* Header */}
          <div className="bg-black text-white px-6 py-5 relative">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm text-gray-300 mt-1">
                  Complete the form to proceed
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-3">
            <InfoRow
              icon={User}
              label="Borrower Name"
              value={data.CurrentUserName || "N/A"}
            />
            <InfoRow
              icon={UserCheck}
              label="Supervisor Name"
              value={data.AcademicStaffName || "N/A"}
            />
            <InfoRow
              icon={Package}
              label="Equipment"
              value={data.Name || "N/A"}
            />
            <InfoRow
              icon={Calendar}
              label="Borrower Date"
              value={new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />

            {/* Purpose Input */}
            <div className="pt-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <FileText className="w-4 h-4" />
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2 lg:p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all resize-none bg-gray-50 hover:bg-white h-16 lg:h-20 text-sm lg:text-base"
                placeholder="Please describe the purpose of borrowing this equipment..."
                rows={2}
              />
              <p className="text-xs text-gray-500 mt-2">
                {purpose.length}/500 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
            <div className="w-1/2">
              <Button
                variant="secondary"
                onClick={onCancel}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-medium rounded-lg transition-all"
              >
                Cancel
              </Button>
            </div>
            <div className="w-1/2">
              <Button
                onClick={() => onAccept(purpose)}
                disabled={!purpose.trim()}
                className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                Confirm Request
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default LendingModal;
