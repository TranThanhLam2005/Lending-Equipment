/**
 * Pure presentational component for equipment detail information
 * Displays equipment info with icons in a clean layout
 */

import {memo} from "react";

export interface DetailInfoProps {
  icon: React.ComponentType<{size?: number; className?: string}>;
  label: string;
  info: string;
  className?: string;
}

const DetailInfo = memo(
  ({icon: Icon, label, info, className = ""}: DetailInfoProps) => (
    <div className={`flex items-start gap-2.5 sm:gap-3 ${className}`}>
      <div className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 shadow-sm">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
          {label}
        </span>
        <span className="text-sm sm:text-base text-gray-900 font-medium break-words leading-snug">
          {info}
        </span>
      </div>
    </div>
  )
);

DetailInfo.displayName = "DetailInfo";

export default DetailInfo;
