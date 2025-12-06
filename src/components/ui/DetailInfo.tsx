/**
 * Pure presentational component for equipment detail information
 * Displays equipment info with icons in a clean layout
 */

import {memo, LucideIcon} from "lucide-react";

export interface DetailInfoProps {
  icon: LucideIcon;
  label: string;
  info: string;
  className?: string;
}

const DetailInfo = memo(
  ({icon: Icon, label, info, className = ""}: DetailInfoProps) => (
    <div className={`space-x-2 ${className}`}>
      <div className="flex items-center">
        <Icon size={24} className="flex-shrink-0" />
        <div className="flex flex-col items-start ml-2">
          <div>{label}</div>
          <div className="line-clamp-2">{info}</div>
        </div>
      </div>
    </div>
  )
);

DetailInfo.displayName = "DetailInfo";

export default DetailInfo;
